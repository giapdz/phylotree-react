import { max } from "d3-array";
import { scaleLinear, scaleOrdinal } from "d3-scale";
import { schemeCategory10 } from "d3-scale-chromatic";
import { phylotree } from "phylotree";
import React, { useEffect, useRef, useState } from "react";
import _ from "underscore";
import Branch from "./branch";
import SVG from "./svg";
import text_width from "./text_width";

function x_branch_lengths(node, accessor) {
    if (!node.parent) return 0;

    const bl = accessor(node);
    return bl + node.parent.data.abstract_x;
}

function x_no_branch_lengths(node) {
    return node.parent ? node.parent.data.abstract_x + 1 : 2;
}

function default_accessor(node) {
    return +node.data.attribute;
}

function sort_nodes(tree, direction) {
    tree.traverse_and_compute(function (n) {
        var d = 1;
        if (n.children && n.children.length) {
            d += max(n.children, function (d) {
                return d["count_depth"];
            });
        }
        n["count_depth"] = d;
    });
    const asc = direction === "ascending";
    tree.resortChildren(function (a, b) {
        return (a["count_depth"] - b["count_depth"]) * (asc ? 1 : -1);
    });
}

function toggleCollapse(tree, nodes) {
    nodes.map(function (node) {
        if (node.collapsed) {
            node.collapsed = false;
            let unhide = function (n) {
                if (!tree.isLeafNode(n)) {
                    if (!n.collapsed) {
                        n.children.forEach(unhide);
                    }
                }
                n.hidden = true;
            };

            unhide(node);
        } else {
            node.collapsed = true;
        }
    });
}

function placenodes(tree, perform_internal_layout, accessor, sort, collapse) {
    accessor = accessor || default_accessor;
    if (sort) {
        sort_nodes(tree, sort);
    }
    if (collapse) {
        toggleCollapse(tree, collapse);
    }
    var current_leaf_height = -1,
        unique_id = 0;
    tree.max_x = 0;
    const has_branch_lengths = Boolean(accessor(tree.getTips()[0])),
        x_branch_length = has_branch_lengths
            ? x_branch_lengths
            : x_no_branch_lengths;
    function node_layout(node) {
        if (!node.unique_id) {
            unique_id = node.unique_id = unique_id + 1;
        }
        node.data.abstract_x = x_branch_length(node, accessor);
        tree.max_x = Math.max(tree.max_x, node.data.abstract_x);
        if (node.children) {
            node.data.abstract_y =
                node.children.map(node_layout).reduce((a, b) => a + b, 0) /
                node.children.length;
        } else {
            current_leaf_height = node.data.abstract_y =
                current_leaf_height + 1;
        }
        return node.data.abstract_y;
    }

    function internal_node_layout(node) {
        unique_id = node.unique_id = unique_id + 1;
        node.data.abstract_x = x_branch_length(node, accessor);
        tree.max_x = Math.max(tree.max_x, node.data.abstract_x);
        if (!tree.isLeafNode(node)) {
            node.children.forEach(internal_node_layout);
        }
        if (!node.data.abstract_y && node.data.name !== "root") {
            current_leaf_height = node.data.abstract_y =
                current_leaf_height + 1;
            tree.nodeOrder.push(node.data.name);
        }
        if (
            node.parent &&
            !node.parent.data.abstract_y &&
            node.data.name !== "root"
        ) {
            if (node.parent.data.name !== "root") {
                current_leaf_height = node.parent.data.abstract_y =
                    current_leaf_height + 1;
                tree.node_order.push(node.parent.data.name);
            }
        }
        tree.max_y = Math.max(tree.max_y, current_leaf_height);
    }

    if (perform_internal_layout) {
        tree.max_y = 0;
        tree.node_order = [];
        internal_node_layout(tree.nodes);
        const root =
            tree.getNodeByName("root") || tree.getNodeByName("new_root");
        root.data.abstract_y =
            root.children
                .map((child) => child.data.abstract_y)
                .reduce((a, b) => a + b, 0) / root.children.length;
    } else {
        node_layout(tree.nodes);
        tree.max_y = current_leaf_height;
    }
}

function getColorScale(tree, highlightBranches) {
    if (!highlightBranches) return null;

    if (typeof highlightBranches === "boolean") {
        return tree.parsed_tags && highlightBranches
            ? scaleOrdinal().domain(tree.parsed_tags).range(schemeCategory10)
            : null;
    }
    const pairs = _.pairs(highlightBranches);
    return scaleOrdinal()
        .domain(pairs.map((p) => p[0]))
        .range(pairs.map((p) => p[1]));
}

function Phylotree(props) {
    const [tooltip, setTooltip] = useState(false);
    const { width, height, maxLabelWidth } = props;
    const [isOpen, setIsOpen] = useState(false);
    const container = useRef();
    useEffect(() => {
        setIsOpen(false);

        window.addEventListener("mousedown", handleClickOutside);
        return () => {
            window.removeEventListener("mousedown", handleClickOutside);
        };
    }, [props.reroot, props.collapsed]);
    const handleClickOutside = (event) => {
        if (container.current && !container.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    var { tree, newick } = props;
    if (!tree && !newick) {
        return <g />;
    } else if (!tree) {
        tree = new phylotree(newick);

        if (props.collapsed) {
            const c = [];
            props.collapsed.forEach(function (node) {
                for (let n of tree.getNodes()) {
                    if (!tree.isLeafNode(n)) {
                        if (node.data.name === n.data.name) {
                            c.push(n);
                        }
                    }
                }
            });
            toggleCollapse(tree, c);
            placenodes(
                tree,
                props.internalNodeLabels,
                props.accessor,
                props.sort,
                c
            );
        }
        if (!props.skipPlacement) {
            placenodes(
                tree,
                props.internalNodeLabels,
                props.accessor,
                props.sort
            );
        }
    }

    function attachTextWidth(node) {
        node.data.text_width = text_width(node.data.name, 14, maxLabelWidth);
        if (node.children) node.children.forEach(attachTextWidth);
    }
    attachTextWidth(tree.nodes);
    const sorted_tips = tree
        .getTips()
        .sort((a, b) => b.data.abstract_x - a.data.abstract_x);
    var rightmost = width;
    for (let i = 0; i < sorted_tips.length; i++) {
        let tip = sorted_tips[i];
        rightmost = width - tip.data.text_width;
        let scale = rightmost / tip.data.abstract_x;
        let none_cross = sorted_tips
            .map((tip) => {
                const tip_x = tip.data.abstract_x * scale,
                    text_x = width - tip.data.text_width,
                    this_doesnt_cross = Math.floor(tip_x) < Math.ceil(text_x);
                return this_doesnt_cross;
            })
            .every((x) => x);
        if (none_cross) break;
    }
    const x_scale = scaleLinear().domain([0, tree.max_x]).range([0, rightmost]),
        y_scale = scaleLinear()
            .domain([0, tree.max_y])
            .range([props.includeBLAxis ? 60 : 0, height]),
        color_scale = getColorScale(tree, props.highlightBranches);

    return (
        <div class="col-md-12">
            <SVG width={width + 100} height={height + 100}>
                <g transform={props.transform}>
                    <defs></defs>
                    {/* {props.includeBLAxis ? <g>
      <text
        x={x_scale(tree.max_x/2)}
        y={10}
        alignmentBaseline='middle'
        textAnchor='middle'
        fontFamily='Courier'
      >
        Substitutions per site
      </text>
      <AxisTop
        transform={`translate(0, 40)`}
        scale={x_scale}
      />
    </g> : null } */}
                    {tree.links.map((link) => {
                        const source_id = link.source.unique_id,
                            target_id = link.target.unique_id,
                            key = source_id + "," + target_id,
                            show_label =
                                props.internalNodeLabels ||
                                (props.showLabels &&
                                    tree.isLeafNode(link.target));
                        const show_attribute = props.showAttributes;
                        const show_value1 = props.showValue1;
                        const show_value2 = props.showValue2;
                        const show_value3 = props.showValue3;
                        const show_value4 = props.showValue4;
                        const show_value5 = props.showValue5;
                        const round1 = props.round1;
                        const round2 = props.round2;
                        const round3 = props.round3;
                        const round4 = props.round4;
                        const round5 = props.round5;
                        return (
                            <Branch
                                tree={tree}
                                key={key}
                                xScale={x_scale}
                                yScale={y_scale}
                                colorScale={color_scale}
                                link={link}
                                showLabel={show_label}
                                showAttribute={show_attribute}
                                showValue1={show_value1}
                                showValue2={show_value2}
                                showValue3={show_value3}
                                showValue4={show_value4}
                                showValue5={show_value5}
                                round1={round1}
                                round2={round2}
                                round3={round3}
                                round4={round4}
                                round5={round5}
                                maxLabelWidth={maxLabelWidth}
                                width={width}
                                alignTips={props.alignTips}
                                branchStyler={props.branchStyler}
                                labelStyler={props.labelStyler}
                                tooltip={props.tooltip}
                                setTooltip={setTooltip}
                                setIsOpen={setIsOpen}
                                isOpen={props.isOpen}
                            />
                        );
                    })}
                    {tooltip ? (
                        <props.tooltip
                            width={props.width}
                            height={props.height}
                            {...tooltip}
                        />
                    ) : null}{" "}
                </g>
            </SVG>
            <div ref={container}>
                {isOpen ? <props.isOpen {...isOpen} /> : null}{" "}
            </div>
        </div>
    );
}
Phylotree.defaultProps = {
    showLabels: true,
    skipPlacement: false,
    maxLabelWidth: 20,
    alignTips: "left",
    accessor: default_accessor,
    branchStyler: null,
    labelStyler: null,
    tooltip: null,
    includeBLAxis: false,
};

export default Phylotree;
export { placenodes };

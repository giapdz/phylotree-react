import {
    faAlignLeft,
    faAlignRight,
    faArrowDown,
    faArrowLeft,
    faArrowRight,
    faArrowUp,
    faFileExport,
    faImage,
    faRedo,
    faSortAmountUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "bootstrap/dist/css/bootstrap.min.css";
import FileSaver from "file-saver";
import { phylotree } from "phylotree";
import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import saveSvgAsPng from "save-svg-as-png";
import Phylotree from "./phylotree";
import showLength from "./styles/icon_length.png";
import "./styles/phylotree.css";
import showLabel from "./styles/show_label.png";
import TooltipContainer from "./tooltip_container";
const imageOptions = {
    scale: 5,
    encoderOptions: 1,
    backgroundColor: "white",
};

function Reload(props) {
    return (
        <Button title="Reload tree" variant="secondary" {...props}>
            <FontAwesomeIcon icon={faRedo} size="lg" style={{ width: 15 }} />
        </Button>
    );
}
function HorizontalExpansionButton(props) {
    return (
        <Button title="Expand horizontally" variant="secondary" {...props}>
            <FontAwesomeIcon key={1} icon={faArrowLeft} style={{ width: 10 }} />
            <FontAwesomeIcon
                key={2}
                icon={faArrowRight}
                style={{ width: 10 }}
            />
        </Button>
    );
}

function HorizontalCompressionButton(props) {
    return (
        <Button title="Compress horizontally" variant="secondary" {...props}>
            <FontAwesomeIcon
                key={1}
                icon={faArrowRight}
                style={{ width: 10 }}
            />
            <FontAwesomeIcon key={2} icon={faArrowLeft} style={{ width: 10 }} />
        </Button>
    );
}

function VerticalExpansionButton(props) {
    return (
        <Button
            style={{
                fontSize: 12,
                display: "flex",
                flexDirection: "column",
            }}
            title="Expand vertically"
            variant="secondary"
            {...props}
        >
            <FontAwesomeIcon key={1} icon={faArrowUp} />
            <FontAwesomeIcon key={2} icon={faArrowDown} />
        </Button>
    );
}

function VerticalCompressionButton(props) {
    return (
        <Button
            style={{
                fontSize: 12,
                display: "flex",
                flexDirection: "column",
            }}
            title="Compress vertically"
            variant="secondary"
            {...props}
        >
            <FontAwesomeIcon key={1} icon={faArrowDown} />
            <FontAwesomeIcon key={2} icon={faArrowUp} />
        </Button>
    );
}

function AscendingSortButton(props) {
    return (
        <Button title="Sort in ascending order" variant="secondary" {...props}>
            <FontAwesomeIcon key={1} icon={faSortAmountUp} flip="vertical" />
        </Button>
    );
}

function DescendingSortButton(props) {
    return (
        <Button title="Sort in descending order" variant="secondary" {...props}>
            <FontAwesomeIcon key={1} icon={faSortAmountUp} />
        </Button>
    );
}

function AlignTipsRightButton(props) {
    return (
        <Button title="Align tips to right" variant="secondary" {...props}>
            <FontAwesomeIcon key={1} icon={faAlignRight} />
        </Button>
    );
}

function AlignTipsLeftButton(props) {
    return (
        <Button title="Align tips to left" variant="secondary" {...props}>
            <FontAwesomeIcon key={1} icon={faAlignLeft} />
        </Button>
    );
}
function DownloadImagetButton(props) {
    return (
        <Button title="Save image" variant="secondary" {...props}>
            <FontAwesomeIcon key={1} icon={faImage} flip="vertical" />
        </Button>
    );
}
function SaveNewickButton(props) {
    return (
        <Button title="Export to Newick" variant="secondary" {...props}>
            <FontAwesomeIcon key={1} icon={faFileExport} flip="vertical" />
        </Button>
    );
}
function TooltipContents(props) {
    return (
        <TooltipContainer tooltip_width={10} tooltip_height={50} {...props}>
            <rect x={0} y={0} width={180} height={20} fill="bisque" />
            <text x={90} y={15} fill="cadetblue" textAnchor="middle">
                Length: {props.data.attribute}{" "}
            </text>
        </TooltipContainer>
    );
}

class PhylotreeApplication extends Component {
    constructor(props) {
        super(props);
        let new_wick = props.newick;
        let result = new_wick.split("");
        let result2 = new_wick.split("");
        let id = 0;
        for (let i = 0; i < result.length; i++) {
            if (result[i] === ":") {
                result2.splice(i + id, 0, "/", id);
                id += 2;
            }
        }
        result = result2.join("");
        this.state = {
            tree: null,
            width: props.width,
            height: props.height,
            sort: null,
            reroot: null,
            collapsed: [],
            internal: false,
            newick: result,
            support: props.support,
            round: props.round,
            nodeName: "",
            showlabel: true,
        };
        this.baseState = this.state;
    }
    // static getDerivedStateFromProps(nextProps, prevState) {
    //     if (nextProps.newick !== prevState.newick) {
    //         return { newick: nextProps.newick };
    //     }
    //     return null;
    // }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.newick !== this.props.newick) {
            let new_wick = this.props.newick;
            let result = new_wick.split("");
            let result2 = new_wick.split("");
            let id = 0;
            for (let i = 0; i < result.length; i++) {
                if (result[i] === ":") {
                    result2.splice(i + id, 0, "/", id);
                    id += 2;
                }
            }
            result = result2.join("");
            this.setState({ newick: result });
        }
    }

    toggleDimension = (dimension, direction) => {
        const new_dimension =
                this.state[dimension] + (direction === "expand" ? 100 : -100),
            new_state = {};
        new_state[dimension] = new_dimension;
        this.setState(new_state);
    };
    handleSort = (direction) => {
        this.setState({ sort: direction });
    };
    alignTips = (direction) => {
        this.setState({ alignTips: direction });
    };
    myChangeHandler = (event) => {
        this.setState({ nodeName: event.target.value });
    };
    findValue(haystack, needle) {
        for (const item of haystack) {
            if (item.data.name === needle.data.name) {
                return true;
            }
        }
        return false;
    }
    toggleCollapse(node) {
        if (this.findValue(this.state.collapsed, node)) {
            const newCollapsed = this.state.collapsed.filter(
                (element) => element.data.name !== node.data.name
            );
            this.setState({ collapsed: newCollapsed });
        } else if (
            !this.findValue(this.state.collapsed, node) ||
            this.state.collapsed === []
        ) {
            this.setState((prevState) => ({
                collapsed: [...prevState.collapsed, node],
            }));
            this.setState({ isNodeCollapsed: true });
        }
    }

    labelStyler = (branch) => {
        var rx = new RegExp(this.state.nodeName, "i");
        const identifier = branch.name.split("/")[0].search(rx);
        if (this.state.nodeName !== "") {
            const fill = identifier !== -1 ? "red" : "black";
            return { fill };
        }
    };
    handleClick = () => {
        saveSvgAsPng.saveSvgAsPng(
            document.getElementById("svg-chart"),
            "shapes.png",
            imageOptions
        );
    };
    exportNewick = () => {
        let pattern = /\/+[0-9]+:/g;
        let result = this.state.newick.replace(pattern, ":");
        console.log(result);
        var blob = new Blob([result], {
            type: "text/plain;charset=utf-8",
        });
        FileSaver.saveAs(blob, "newick.treefile");
    };
    reRoot = (node) => {
        let pattern = /__reroot_top_clade/g;
        let tree = new phylotree(this.state.newick);
        let r = tree.getNodeByName(node.data.name);
        let result = tree.reroot(r).getNewick().replace(pattern, "");
        this.setState({ newick: result, reroot: node });
    };
    openDropdown = (props) => {
        return (
            <div
                class="dropdown-menu"
                role="menu"
                style={{
                    ...props,
                }}
            >
                {props.nodeC ? (
                    <a
                        class="dropdown-item"
                        tabindex="-1"
                        onClick={() => {
                            this.toggleCollapse(props.nodeC);
                        }}
                    >
                        {this.findValue(this.state.collapsed, props.nodeC)
                            ? "Expand Subtree"
                            : "Collapse Subtree"}
                    </a>
                ) : null}
                {props.nodeC && props.node ? (
                    <div class="dropdown-divider"></div>
                ) : null}
                {props.node ? (
                    <a
                        class="dropdown-item"
                        tabindex="-1"
                        onClick={() => {
                            this.reRoot(props.node);
                        }}
                    >
                        Reroot on this node
                    </a>
                ) : null}{" "}
            </div>
        );
    };
    render() {
        const { padding } = this.props;
        const { width, height } = this.state;
        return (
            <div class="container">
                <div
                    style={{
                        display: "inline-block",
                        width: 800,
                    }}
                >
                    <div style={{ marginTop: 20 }}>
                        <ButtonGroup>
                            <Reload
                                onClick={() => {
                                    this.setState(this.baseState);
                                }}
                            />
                            <HorizontalExpansionButton
                                onClick={() =>
                                    this.toggleDimension("width", "expand")
                                }
                            />
                            <HorizontalCompressionButton
                                onClick={() =>
                                    this.toggleDimension("width", "compress")
                                }
                            />
                            <VerticalExpansionButton
                                onClick={() =>
                                    this.toggleDimension("height", "expand")
                                }
                            />
                            <VerticalCompressionButton
                                onClick={() =>
                                    this.toggleDimension("height", "compress")
                                }
                            />
                            <AscendingSortButton
                                onClick={() => this.handleSort("ascending")}
                            />
                            <DescendingSortButton
                                onClick={() => this.handleSort("descending")}
                            />
                            <AlignTipsLeftButton
                                onClick={() => this.alignTips("left")}
                            />
                            <AlignTipsRightButton
                                onClick={() => this.alignTips("right")}
                            />
                            <Button
                                title="Toggle the display of taxa names"
                                variant="secondary"
                                onClick={() =>
                                    this.setState({
                                        showlabel: !this.state.showlabel,
                                    })
                                }
                            >
                                <img src={showLabel} width="18" />
                            </Button>
                            <Button
                                title="Toggle the display of branch lengths"
                                variant="secondary"
                                onClick={() =>
                                    this.setState({
                                        attribute: !this.state.attribute,
                                    })
                                }
                            >
                                <img src={showLength} width="20" />
                            </Button>
                            <SaveNewickButton onClick={this.exportNewick} />
                            <DownloadImagetButton onClick={this.handleClick} />
                        </ButtonGroup>

                        <form
                            style={{
                                display: "inline-block",
                                float: "right",
                            }}
                        >
                            <input
                                type="text"
                                name="find node"
                                placeholder="Search tree"
                                style={{
                                    height: 40,
                                    textAlign: "center",
                                }}
                                onChange={this.myChangeHandler}
                            />
                        </form>

                        <div
                            class="row align-items-start"
                            style={{ width: 470 }}
                        >
                            {this.state.support.split("/")[0] ? (
                                <div class="col">
                                    <input
                                        type="checkbox"
                                        onChange={() =>
                                            this.setState({
                                                value1: !this.state.value1,
                                            })
                                        }
                                        style={{ marginRight: 5 }}
                                    />
                                    <text>
                                        {this.state.value1 ? "Hide " : "Show "}
                                        {this.state.support.split("/")[0]}
                                    </text>
                                </div>
                            ) : null}
                            {this.state.support.split("/")[1] ? (
                                <div class="col">
                                    <input
                                        type="checkbox"
                                        onChange={() =>
                                            this.setState({
                                                value2: !this.state.value2,
                                            })
                                        }
                                        style={{ marginRight: 5 }}
                                    />
                                    <text>
                                        {this.state.value2 ? "Hide " : "Show "}
                                        {this.state.support.split("/")[1]}
                                    </text>
                                </div>
                            ) : null}
                            {this.state.support.split("/")[2] ? (
                                <div class="col">
                                    <input
                                        type="checkbox"
                                        onChange={() =>
                                            this.setState({
                                                value3: !this.state.value3,
                                            })
                                        }
                                        style={{ marginRight: 5 }}
                                    />
                                    <text>
                                        {this.state.value3 ? "Hide " : "Show "}
                                        {this.state.support.split("/")[2]}
                                    </text>
                                </div>
                            ) : null}
                            {this.state.support.split("/")[3] ? (
                                <div class="col">
                                    <input
                                        type="checkbox"
                                        onChange={() =>
                                            this.setState({
                                                value4: !this.state.value4,
                                            })
                                        }
                                        style={{ marginRight: 5 }}
                                    />
                                    <text>
                                        {this.state.value4 ? "Hide " : "Show "}
                                        {this.state.support.split("/")[3]}
                                    </text>
                                </div>
                            ) : null}
                            {this.state.support.split("/")[4] ? (
                                <div class="col">
                                    <input
                                        type="checkbox"
                                        onChange={() =>
                                            this.setState({
                                                value5: !this.state.value5,
                                            })
                                        }
                                        style={{ marginRight: 5 }}
                                    />
                                    <text>
                                        {this.state.value5 ? "Hide " : "Show "}
                                        {this.state.support.split("/")[4]}
                                    </text>
                                </div>
                            ) : null}{" "}
                        </div>
                    </div>
                </div>
                <Phylotree
                    width={width}
                    height={height}
                    transform={`translate(${padding}, ${padding})`}
                    labelStyler={this.labelStyler}
                    newick={this.state.newick}
                    alignTips={this.state.alignTips}
                    sort={this.state.sort}
                    reroot={this.state.reroot}
                    getNewick={this.state.getNewick}
                    collapsed={this.state.collapsed}
                    showAttributes={this.state.attribute}
                    showLabels={this.state.showlabel}
                    showValue1={this.state.value1}
                    showValue2={this.state.value2}
                    showValue3={this.state.value3}
                    showValue4={this.state.value4}
                    showValue5={this.state.value5}
                    round1={this.state.round.split(",")[0]}
                    round2={this.state.round.split(",")[1]}
                    round3={this.state.round.split(",")[2]}
                    round4={this.state.round.split(",")[3]}
                    round5={this.state.round.split(",")[4]}
                    tooltip={TooltipContents}
                    isOpen={this.openDropdown}
                    includeBLAxis
                />
            </div>
        );
    }
}
PhylotreeApplication.defaultProps = {
    padding: 100,
    height: 600,
    width: 600,
    support: "value 1/value 2/value 3/value 4/value 5",
    round: "-1,-1,-1,-1,-1",
};

export default PhylotreeApplication;

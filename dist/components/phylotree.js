"use strict";

require("core-js/modules/es.object.assign.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.placenodes = placenodes;
exports.default = void 0;

require("core-js/modules/es.array.reduce.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.array.sort.js");

var _react = _interopRequireWildcard(require("react"));

var _phylotree = require("phylotree");

var _d3Scale = require("d3-scale");

var _d3ScaleChromatic = require("d3-scale-chromatic");

var _underscore = _interopRequireDefault(require("underscore"));

var _d3Array = require("d3-array");

var _branch = _interopRequireDefault(require("./branch"));

var _text_width = _interopRequireDefault(require("./text_width"));

var _svg = _interopRequireDefault(require("./svg"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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
      d += (0, _d3Array.max)(n.children, function (d) {
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

function placenodes(tree, perform_internal_layout, accessor, sort) {
  accessor = accessor || default_accessor;

  if (sort) {
    sort_nodes(tree, sort);
  }

  var current_leaf_height = -1;
  tree.max_x = 0;
  const has_branch_lengths = Boolean(accessor(tree.getTips()[0])),
        x_branch_length = has_branch_lengths ? x_branch_lengths : x_no_branch_lengths;

  function node_layout(node) {
    node.data.abstract_x = x_branch_length(node, accessor);
    tree.max_x = Math.max(tree.max_x, node.data.abstract_x);

    if (node.children) {
      node.data.abstract_y = node.children.map(node_layout).reduce((a, b) => a + b, 0) / node.children.length;
    } else {
      current_leaf_height = node.data.abstract_y = current_leaf_height + 1;
    }

    return node.data.abstract_y;
  }

  function internal_node_layout(node) {
    node.data.abstract_x = x_branch_length(node, accessor);
    tree.max_x = Math.max(tree.max_x, node.data.abstract_x);

    if (!tree.isLeafNode(node)) {
      node.children.forEach(internal_node_layout);
    }

    if (!node.data.abstract_y && node.data.name !== "root") {
      current_leaf_height = node.data.abstract_y = current_leaf_height + 1;
      tree.nodeOrder.push(node.data.name);
    }

    if (node.parent && !node.parent.data.abstract_y && node.data.name !== "root") {
      if (node.parent.data.name !== "root") {
        current_leaf_height = node.parent.data.abstract_y = current_leaf_height + 1;
        tree.node_order.push(node.parent.data.name);
      }
    }

    tree.max_y = Math.max(tree.max_y, current_leaf_height);
  }

  if (perform_internal_layout) {
    tree.max_y = 0;
    tree.node_order = [];
    internal_node_layout(tree.nodes);
    const root = tree.getNodeByName("root") || tree.getNodeByName("new_root");
    root.data.abstract_y = root.children.map(child => child.data.abstract_y).reduce((a, b) => a + b, 0) / root.children.length;
  } else {
    node_layout(tree.nodes);
    tree.max_y = current_leaf_height;
  }
}

function getColorScale(tree, highlightBranches) {
  if (!highlightBranches) return null;

  if (typeof highlightBranches === "boolean") {
    return tree.parsed_tags && highlightBranches ? (0, _d3Scale.scaleOrdinal)().domain(tree.parsed_tags).range(_d3ScaleChromatic.schemeCategory10) : null;
  }

  const pairs = _underscore.default.pairs(highlightBranches);

  return (0, _d3Scale.scaleOrdinal)().domain(pairs.map(p => p[0])).range(pairs.map(p => p[1]));
} //  function toggleCollapse(node) {
//     if (node.collapsed) {
//       node.collapsed = false;
//       let unhide = function(n) {
//         if (!isLeafNode(n)) {
//           if (!n.collapsed) {
//             n.children.forEach(unhide);
//           }
//         }
//         n.hidden = false;
//       };
//       unhide(node);
//     } else {
//       node.collapsed = true;
//     }
//     this.placenodes();
//     return this;
//   }


function Phylotree(props) {
  const [tooltip, setTooltip] = (0, _react.useState)(false);
  const {
    width,
    height,
    maxLabelWidth
  } = props;
  const [isOpen, setIsOpen] = (0, _react.useState)(false);
  const container = (0, _react.useRef)();
  (0, _react.useEffect)(() => {
    setIsOpen(false);
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [props.reroot]);

  const handleClickOutside = event => {
    if (container.current && !container.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  var {
    tree,
    newick
  } = props;

  if (!tree && !newick) {
    return /*#__PURE__*/_react.default.createElement("g", null);
  } else if (!tree) {
    tree = new _phylotree.phylotree(newick);

    if (props.reroot) {
      var r,
          node_child = props.reroot.children,
          node_name = props.reroot.data.name;

      if (node_name === '__reroot_top_clade') {
        new _phylotree.phylotree(newick);
      } else {
        if (node_name !== '') {
          r = tree.getNodeByName(node_name);
        } else if (node_child) {
          for (let n of tree.getNodes()) {
            if (!tree.isLeafNode(n)) {
              if (node_name === n.data.name && node_child[0].data.name === n.children[0].data.name && node_child[1].data.name === n.children[1].data.name && node_child[0].data.original_child_order === n.children[0].data.original_child_order && node_child[1].data.original_child_order === n.children[1].data.original_child_order) {
                r = n;
              }
            }
          } //  r= target_node(node_child,node_name,tree.nodes)

        }

        let newick2 = tree.reroot(r, 1).getNewick();
        tree = new _phylotree.phylotree(newick2);
      }
    }
  }

  console.log(tree.getNewick());

  if (!props.skipPlacement) {
    placenodes(tree, props.internalNodeLabels, props.accessor, props.sort);
  }

  function attachTextWidth(node) {
    node.data.text_width = (0, _text_width.default)(node.data.name, 14, maxLabelWidth);
    if (node.children) node.children.forEach(attachTextWidth);
  }

  attachTextWidth(tree.nodes);
  const sorted_tips = tree.getTips().sort((a, b) => b.data.abstract_x - a.data.abstract_x);
  var rightmost = width;

  for (let i = 0; i < sorted_tips.length; i++) {
    let tip = sorted_tips[i];
    rightmost = width - tip.data.text_width;
    let scale = rightmost / tip.data.abstract_x;
    let none_cross = sorted_tips.map(tip => {
      const tip_x = tip.data.abstract_x * scale,
            text_x = width - tip.data.text_width,
            this_doesnt_cross = Math.floor(tip_x) < Math.ceil(text_x);
      return this_doesnt_cross;
    }).every(x => x);
    if (none_cross) break;
  }

  const x_scale = (0, _d3Scale.scaleLinear)().domain([0, tree.max_x]).range([0, rightmost]),
        y_scale = (0, _d3Scale.scaleLinear)().domain([0, tree.max_y]).range([props.includeBLAxis ? 60 : 0, height]),
        color_scale = getColorScale(tree, props.highlightBranches);
  return /*#__PURE__*/_react.default.createElement("div", {
    class: "col-md-12"
  }, /*#__PURE__*/_react.default.createElement(_svg.default, {
    width: width + 100,
    height: height + 100
  }, /*#__PURE__*/_react.default.createElement("g", {
    transform: props.transform
  }, /*#__PURE__*/_react.default.createElement("defs", null), tree.links.map(link => {
    const source_id = link.source.unique_id,
          target_id = link.target.unique_id,
          key = source_id + "," + target_id,
          show_label = props.internalNodeLabels || props.showLabels && tree.isLeafNode(link.target);
    const show_attribute = props.showAttributes;
    const show_value1 = props.showValue1;
    const show_value2 = props.showValue2;
    const show_value3 = props.showValue3;
    const show_value4 = props.showValue4;
    const show_value5 = props.showValue5;
    return /*#__PURE__*/_react.default.createElement(_branch.default, {
      tree: tree,
      key: key,
      xScale: x_scale,
      yScale: y_scale,
      colorScale: color_scale,
      link: link,
      showLabel: show_label,
      showAttribute: show_attribute,
      showValue1: show_value1,
      showValue2: show_value2,
      showValue3: show_value3,
      showValue4: show_value4,
      showValue5: show_value5,
      maxLabelWidth: maxLabelWidth,
      width: width,
      alignTips: props.alignTips,
      branchStyler: props.branchStyler,
      labelStyler: props.labelStyler,
      tooltip: props.tooltip,
      setTooltip: setTooltip,
      setIsOpen: setIsOpen,
      isOpen: props.isOpen
    });
  }), tooltip ? /*#__PURE__*/_react.default.createElement(props.tooltip, _extends({
    width: props.width,
    height: props.height
  }, tooltip)) : null)), /*#__PURE__*/_react.default.createElement("div", {
    ref: container
  }, isOpen ? /*#__PURE__*/_react.default.createElement(props.isOpen, isOpen) : null));
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
  sort: null,
  reroot: null,
  includeBLAxis: false
};
var _default = Phylotree;
exports.default = _default;
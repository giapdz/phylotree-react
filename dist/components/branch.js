"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.parse-float.js");

require("core-js/modules/es.object.assign.js");

require("core-js/modules/es.number.to-fixed.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.split.js");

require("core-js/modules/es.string.includes.js");

require("bootstrap/dist/css/bootstrap.min.css");

var _d3Shape = require("d3-shape");

var _react = _interopRequireDefault(require("react"));

require("./styles/phylotree.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function Branch(props) {
  const {
    xScale,
    yScale,
    colorScale,
    showLabel,
    setTooltip,
    showAttribute,
    tree,
    setIsOpen,
    showValue1,
    showValue2,
    showValue3,
    showValue4,
    showValue5,
    round1,
    round2,
    round3,
    round4,
    round5
  } = props,
        {
    source,
    target
  } = props.link,
        source_x = xScale(source.data.abstract_x),
        source_y = yScale(source.data.abstract_y),
        target_x = xScale(target.data.abstract_x),
        target_y = yScale(target.data.abstract_y),
        tracer_x2 = props.alignTips === "right" ? props.width - (target.data.text_width || 0) : target_x,
        round_1 = parseFloat(round1),
        round_2 = parseFloat(round2),
        round_3 = parseFloat(round3),
        round_4 = parseFloat(round4),
        round_5 = parseFloat(round5),
        data = [[source_x, source_y], [source_x, target_y], [target_x, target_y]],
        data1 = [[target_x + 18, target_y + 10], [target_x - 2, target_y], [target_x + 18, target_y - 10]],
        branch_line = (0, _d3Shape.line)().x(d => d[0]).y(d => d[1]),
        computed_branch_styles = props.branchStyler ? props.branchStyler(target.data) : target.data.annotation && colorScale ? {
    stroke: colorScale(target.data.annotation)
  } : {},
        all_branch_styles = Object.assign({}, props.branchStyle, computed_branch_styles),
        label_style = target.data.name && props.labelStyler ? props.labelStyler(target.data) : {};
  if (target.hidden === true && target.collapsed === false && target.parent.hidden === true) return null;else if (target.hidden === true && target.collapsed === false && target.data.attribute !== "0") {
    return /*#__PURE__*/_react.default.createElement("g", {
      class: "internal-node"
    }, /*#__PURE__*/_react.default.createElement("path", _extends({
      className: "rp-branch",
      fill: "none",
      d: branch_line(data)
    }, all_branch_styles, {
      onMouseMove: props.tooltip ? e => {
        setTooltip({
          x: e.nativeEvent.offsetX,
          y: e.nativeEvent.offsetY,
          data: target.data
        });
      } : undefined,
      onMouseOut: props.tooltip ? e => {
        setTooltip(false);
      } : undefined,
      onClick: e => {
        setIsOpen({
          left: e.nativeEvent.offsetX + 50,
          top: e.nativeEvent.offsetY + 80,
          position: "absolute",
          display: "block",
          node: target,
          nodeC: target
        });
      }
    })), /*#__PURE__*/_react.default.createElement("polygon", {
      points: data1,
      fill: "grey"
    }), showAttribute ? /*#__PURE__*/_react.default.createElement("text", {
      x: source_x + (target_x - source_x) / 2 - 20,
      y: target_y - 8,
      textAnchor: "start",
      alignmentBaseline: "middle",
      className: "rp-label"
    }, parseFloat(target.data.attribute).toFixed(4)) : null);
  } else if (target.hidden === true && target.collapsed === false && target.data.attribute === "0") {
    return /*#__PURE__*/_react.default.createElement("g", {
      class: "internal-node"
    }, /*#__PURE__*/_react.default.createElement("path", _extends({
      className: "rp-branch",
      fill: "none",
      d: branch_line(data)
    }, all_branch_styles, {
      onMouseMove: props.tooltip ? e => {
        setTooltip({
          x: e.nativeEvent.offsetX,
          y: e.nativeEvent.offsetY,
          data: target.data
        });
      } : undefined,
      onMouseOut: props.tooltip ? e => {
        setTooltip(false);
      } : undefined,
      onClick: e => {
        setIsOpen({
          left: e.nativeEvent.offsetX + 50,
          top: e.nativeEvent.offsetY + 80,
          position: "absolute",
          display: "block",
          nodeC: target
        });
      }
    })), /*#__PURE__*/_react.default.createElement("polygon", {
      points: data1,
      fill: "grey"
    }), showAttribute ? /*#__PURE__*/_react.default.createElement("text", {
      x: source_x + (target_x - source_x) / 2 - 20,
      y: target_y - 8,
      textAnchor: "start",
      alignmentBaseline: "middle",
      className: "rp-label"
    }) : null);
  } else if (target.hidden === true) return null;else {
    if (tree.isLeafNode(target)) {
      return /*#__PURE__*/_react.default.createElement("g", {
        className: "node"
      }, /*#__PURE__*/_react.default.createElement("path", _extends({
        className: "rp-branch",
        fill: "none",
        d: branch_line(data)
      }, all_branch_styles, {
        onMouseMove: props.tooltip ? e => {
          setTooltip({
            x: e.nativeEvent.offsetX,
            y: e.nativeEvent.offsetY,
            data: target.data
          });
        } : undefined,
        onMouseOut: props.tooltip ? e => {
          setTooltip(false);
        } : undefined,
        onClick: props.isOpen ? e => {
          setIsOpen({
            left: e.nativeEvent.offsetX + 120,
            top: e.nativeEvent.offsetY + 120,
            position: "absolute",
            display: "block",
            node: target
          });
        } : undefined
      })), showAttribute ? /*#__PURE__*/_react.default.createElement("text", {
        x: source_x + (target_x - source_x) / 2 - 20,
        y: target_y - 8,
        textAnchor: "start",
        alignmentBaseline: "middle",
        className: "rp-label"
      }, parseFloat(target.data.attribute).toFixed(4)) : null, showLabel ? /*#__PURE__*/_react.default.createElement("line", {
        x1: target_x,
        x2: tracer_x2,
        y1: target_y,
        y2: target_y,
        className: "rp-branch-tracer"
      }) : null, showLabel ? /*#__PURE__*/_react.default.createElement("text", _extends({
        x: tracer_x2 + 5,
        y: target_y,
        textAnchor: "start",
        alignmentBaseline: "middle"
      }, Object.assign({}, props.labelStyle, label_style), {
        className: "rp-label"
      }), target.data.name.split("/")[0].slice(0, props.maxLabelWidth)) : null);
    } else {
      return /*#__PURE__*/_react.default.createElement("g", {
        class: "internal-node"
      }, /*#__PURE__*/_react.default.createElement("path", _extends({
        className: "rp-branch",
        fill: "none",
        d: branch_line(data)
      }, all_branch_styles, {
        onMouseMove: props.tooltip ? e => {
          setTooltip({
            x: e.nativeEvent.offsetX,
            y: e.nativeEvent.offsetY,
            data: target.data
          });
        } : undefined,
        onMouseOut: props.tooltip ? e => {
          setTooltip(false);
        } : undefined,
        onClick: e => {
          setIsOpen({
            left: e.nativeEvent.offsetX + 50,
            top: e.nativeEvent.offsetY + 80,
            position: "absolute",
            display: "block",
            node: target.data.attribute === "0" ? null : target,
            nodeC: target
          });
        }
      })), showAttribute ? /*#__PURE__*/_react.default.createElement("text", {
        x: source_x + (target_x - source_x) / 2 - 20,
        y: target_y - 8,
        textAnchor: "start",
        alignmentBaseline: "middle",
        className: "rp-label"
      }, target.data.attribute !== "0" ? parseFloat(target.data.attribute).toFixed(4) : null) : null, (() => {
        if (target.data.name.includes("__reroot_top_clade")) {
          return null;
        } else {
          if (target.data.name.split("/")[0] === "" && target.data.name.split("/")[1] !== "") {
            return null;
          }

          if (!showValue5 && !showValue2 && !showValue3 && !showValue4 && showValue1) {
            return /*#__PURE__*/_react.default.createElement("text", {
              x: source_x + (target_x - source_x) / 2 - 13,
              y: target_y + 10,
              textAnchor: "start",
              alignmentBaseline: "middle",
              className: "rp-label"
            }, round_1 === -1 ? target.data.name.split("/")[0] : parseFloat(target.data.name.split("/")[0]).toFixed(round_1));
          }

          if (!showValue5 && !showValue1 && !showValue3 && !showValue4 && showValue2) {
            return /*#__PURE__*/_react.default.createElement("text", {
              x: source_x + (target_x - source_x) / 2 - 13,
              y: target_y + 10,
              textAnchor: "start",
              alignmentBaseline: "middle",
              className: "rp-label"
            }, round_2 === -1 ? target.data.name.split("/")[1] : parseFloat(target.data.name.split("/")[1]).toFixed(round_2));
          }

          if (!showValue1 && !showValue2 && !showValue4 && !showValue5 && showValue3) {
            return /*#__PURE__*/_react.default.createElement("text", {
              x: source_x + (target_x - source_x) / 2 - 10,
              y: target_y + 10,
              textAnchor: "start",
              alignmentBaseline: "middle",
              className: "rp-label"
            }, round_3 === -1 ? target.data.name.split("/")[2] : parseFloat(target.data.name.split("/")[2]).toFixed(round_3));
          }

          if (!showValue1 && !showValue2 && !showValue3 && !showValue5 && showValue4) {
            return /*#__PURE__*/_react.default.createElement("text", {
              x: source_x + (target_x - source_x) / 2 - 10,
              y: target_y + 10,
              textAnchor: "start",
              alignmentBaseline: "middle",
              className: "rp-label"
            }, round_4 === -1 ? target.data.name.split("/")[3] : parseFloat(target.data.name.split("/")[3]).toFixed(round_4));
          }

          if (!showValue1 && !showValue2 && !showValue3 && !showValue4 && showValue5) {
            return /*#__PURE__*/_react.default.createElement("text", {
              x: source_x + (target_x - source_x) / 2 - 8,
              y: target_y + 10,
              textAnchor: "start",
              alignmentBaseline: "middle",
              className: "rp-label"
            }, round_5 === -1 ? target.data.name.split("/")[4] : parseFloat(target.data.name.split("/")[4]).toFixed(round_5));
          }

          if (showValue1 && showValue2 && !(showValue3 || showValue4 || showValue5)) {
            return /*#__PURE__*/_react.default.createElement("text", {
              x: source_x + (target_x - source_x) / 2 - 28,
              y: target_y + 10,
              textAnchor: "start",
              alignmentBaseline: "middle",
              className: "rp-label"
            }, round_1 === -1 ? target.data.name.split("/")[0] : parseFloat(target.data.name.split("/")[0]).toFixed(round_1), "/", round_2 === -1 ? target.data.name.split("/")[1] : parseFloat(target.data.name.split("/")[1]).toFixed(round_2));
          }

          if (showValue1 && showValue3 && !(showValue2 || showValue4 || showValue5)) {
            return /*#__PURE__*/_react.default.createElement("text", {
              x: source_x + (target_x - source_x) / 2 - 28,
              y: target_y + 10,
              textAnchor: "start",
              alignmentBaseline: "middle",
              className: "rp-label"
            }, round_1 === -1 ? target.data.name.split("/")[0] : parseFloat(target.data.name.split("/")[0]).toFixed(round_1), "/", round_3 === -1 ? target.data.name.split("/")[2] : parseFloat(target.data.name.split("/")[2]).toFixed(round_3));
          }

          if (showValue1 && showValue4 && !(showValue2 || showValue3 || showValue5)) {
            return /*#__PURE__*/_react.default.createElement("text", {
              x: source_x + (target_x - source_x) / 2 - 28,
              y: target_y + 10,
              textAnchor: "start",
              alignmentBaseline: "middle",
              className: "rp-label"
            }, round_1 === -1 ? target.data.name.split("/")[0] : parseFloat(target.data.name.split("/")[0]).toFixed(round_1), "/", round_4 === -1 ? target.data.name.split("/")[3] : parseFloat(target.data.name.split("/")[3]).toFixed(round_4));
          }

          if (showValue1 && showValue5 && !(showValue3 || showValue4 || showValue2)) {
            return /*#__PURE__*/_react.default.createElement("text", {
              x: source_x + (target_x - source_x) / 2 - 28,
              y: target_y + 10,
              textAnchor: "start",
              alignmentBaseline: "middle",
              className: "rp-label"
            }, round_1 === -1 ? target.data.name.split("/")[0] : parseFloat(target.data.name.split("/")[0]).toFixed(round_1), "/", round_5 === -1 ? target.data.name.split("/")[4] : parseFloat(target.data.name.split("/")[4]).toFixed(round_5));
          }

          if (showValue2 && showValue3 && !(showValue1 || showValue4 || showValue5)) {
            return /*#__PURE__*/_react.default.createElement("text", {
              x: source_x + (target_x - source_x) / 2 - 28,
              y: target_y + 10,
              textAnchor: "start",
              alignmentBaseline: "middle",
              className: "rp-label"
            }, round_2 === -1 ? target.data.name.split("/")[1] : parseFloat(target.data.name.split("/")[1]).toFixed(round_2), "/", round_3 === -1 ? target.data.name.split("/")[2] : parseFloat(target.data.name.split("/")[2]).toFixed(round_3));
          }

          if (showValue2 && showValue4 && !(showValue3 || showValue1 || showValue5)) {
            return /*#__PURE__*/_react.default.createElement("text", {
              x: source_x + (target_x - source_x) / 2 - 28,
              y: target_y + 10,
              textAnchor: "start",
              alignmentBaseline: "middle",
              className: "rp-label"
            }, round_2 === -1 ? target.data.name.split("/")[1] : parseFloat(target.data.name.split("/")[1]).toFixed(round_2), "/", round_4 === -1 ? target.data.name.split("/")[3] : parseFloat(target.data.name.split("/")[3]).toFixed(round_4));
          }

          if (showValue2 && showValue5 && !(showValue3 || showValue4 || showValue1)) {
            return /*#__PURE__*/_react.default.createElement("text", {
              x: source_x + (target_x - source_x) / 2 - 28,
              y: target_y + 10,
              textAnchor: "start",
              alignmentBaseline: "middle",
              className: "rp-label"
            }, round_2 === -1 ? target.data.name.split("/")[1] : parseFloat(target.data.name.split("/")[1]).toFixed(round_2), "/", round_5 === -1 ? target.data.name.split("/")[4] : parseFloat(target.data.name.split("/")[4]).toFixed(round_5));
          }

          if (showValue3 && showValue4 && !(showValue1 || showValue2 || showValue5)) {
            return /*#__PURE__*/_react.default.createElement("text", {
              x: source_x + (target_x - source_x) / 2 - 20,
              y: target_y + 10,
              textAnchor: "start",
              alignmentBaseline: "middle",
              className: "rp-label"
            }, round_3 === -1 ? target.data.name.split("/")[2] : parseFloat(target.data.name.split("/")[2]).toFixed(round_3), "/", round_4 === -1 ? target.data.name.split("/")[3] : parseFloat(target.data.name.split("/")[3]).toFixed(round_4));
          }

          if (showValue3 && showValue5 && !(showValue1 || showValue2 || showValue4)) {
            return /*#__PURE__*/_react.default.createElement("text", {
              x: source_x + (target_x - source_x) / 2 - 20,
              y: target_y + 10,
              textAnchor: "start",
              alignmentBaseline: "middle",
              className: "rp-label"
            }, round_3 === -1 ? target.data.name.split("/")[2] : parseFloat(target.data.name.split("/")[2]).toFixed(round_3), "/", round_5 === -1 ? target.data.name.split("/")[4] : parseFloat(target.data.name.split("/")[4]).toFixed(round_5));
          }

          if (showValue4 && showValue5 && !(showValue1 || showValue2 || showValue3)) {
            return /*#__PURE__*/_react.default.createElement("text", {
              x: source_x + (target_x - source_x) / 2 - 20,
              y: target_y + 10,
              textAnchor: "start",
              alignmentBaseline: "middle",
              className: "rp-label"
            }, round_4 === -1 ? target.data.name.split("/")[3] : parseFloat(target.data.name.split("/")[3]).toFixed(round_4), "/", round_5 === -1 ? target.data.name.split("/")[4] : parseFloat(target.data.name.split("/")[4]).toFixed(round_5));
          }

          if (showValue1 && showValue2 && showValue3 && !(showValue4 || showValue5)) {
            return /*#__PURE__*/_react.default.createElement("text", {
              x: source_x + (target_x - source_x) / 2 - 38,
              y: target_y + 10,
              textAnchor: "start",
              alignmentBaseline: "middle",
              className: "rp-label"
            }, round_1 === -1 ? target.data.name.split("/")[0] : parseFloat(target.data.name.split("/")[0]).toFixed(round_1), "/", round_2 === -1 ? target.data.name.split("/")[1] : parseFloat(target.data.name.split("/")[1]).toFixed(round_2), "/", round_3 === -1 ? target.data.name.split("/")[2] : parseFloat(target.data.name.split("/")[2]).toFixed(round_3));
          }

          if (showValue1 && showValue2 && showValue4 && !(showValue3 || showValue5)) {
            return /*#__PURE__*/_react.default.createElement("text", {
              x: source_x + (target_x - source_x) / 2 - 38,
              y: target_y + 10,
              textAnchor: "start",
              alignmentBaseline: "middle",
              className: "rp-label"
            }, round_1 === -1 ? target.data.name.split("/")[0] : parseFloat(target.data.name.split("/")[0]).toFixed(round_1), "/", round_2 === -1 ? target.data.name.split("/")[1] : parseFloat(target.data.name.split("/")[1]).toFixed(round_2), "/", round_4 === -1 ? target.data.name.split("/")[3] : parseFloat(target.data.name.split("/")[3]).toFixed(round_4));
          }

          if (showValue1 && showValue2 && showValue5 && !(showValue3 || showValue4)) {
            return /*#__PURE__*/_react.default.createElement("text", {
              x: source_x + (target_x - source_x) / 2 - 38,
              y: target_y + 10,
              textAnchor: "start",
              alignmentBaseline: "middle",
              className: "rp-label"
            }, round_1 === -1 ? target.data.name.split("/")[0] : parseFloat(target.data.name.split("/")[0]).toFixed(round_1), "/", round_2 === -1 ? target.data.name.split("/")[1] : parseFloat(target.data.name.split("/")[1]).toFixed(round_2), "/", round_5 === -1 ? target.data.name.split("/")[4] : parseFloat(target.data.name.split("/")[4]).toFixed(round_5));
          }

          if (showValue1 && showValue3 && showValue4 && !(showValue2 || showValue5)) {
            return /*#__PURE__*/_react.default.createElement("text", {
              x: source_x + (target_x - source_x) / 2 - 30,
              y: target_y + 10,
              textAnchor: "start",
              alignmentBaseline: "middle",
              className: "rp-label"
            }, round_1 === -1 ? target.data.name.split("/")[0] : parseFloat(target.data.name.split("/")[0]).toFixed(round_1), "/", round_3 === -1 ? target.data.name.split("/")[2] : parseFloat(target.data.name.split("/")[2]).toFixed(round_3), "/", round_4 === -1 ? target.data.name.split("/")[3] : parseFloat(target.data.name.split("/")[3]).toFixed(round_4));
          }

          if (showValue1 && showValue3 && showValue5 && !(showValue2 || showValue4)) {
            return /*#__PURE__*/_react.default.createElement("text", {
              x: source_x + (target_x - source_x) / 2 - 34,
              y: target_y + 10,
              textAnchor: "start",
              alignmentBaseline: "middle",
              className: "rp-label"
            }, round_1 === -1 ? target.data.name.split("/")[0] : parseFloat(target.data.name.split("/")[0]).toFixed(round_1), "/", round_3 === -1 ? target.data.name.split("/")[2] : parseFloat(target.data.name.split("/")[2]).toFixed(round_3), "/", round_5 === -1 ? target.data.name.split("/")[4] : parseFloat(target.data.name.split("/")[4]).toFixed(round_5));
          }

          if (showValue1 && showValue4 && showValue5 && !(showValue2 || showValue3)) {
            return /*#__PURE__*/_react.default.createElement("text", {
              x: source_x + (target_x - source_x) / 2 - 38,
              y: target_y + 10,
              textAnchor: "start",
              alignmentBaseline: "middle",
              className: "rp-label"
            }, round_1 === -1 ? target.data.name.split("/")[0] : parseFloat(target.data.name.split("/")[0]).toFixed(round_1), "/", round_4 === -1 ? target.data.name.split("/")[3] : parseFloat(target.data.name.split("/")[3]).toFixed(round_4), "/", round_5 === -1 ? target.data.name.split("/")[4] : parseFloat(target.data.name.split("/")[4]).toFixed(round_5));
          }

          if (showValue2 && showValue3 && showValue4 && !(showValue1 || showValue5)) {
            return /*#__PURE__*/_react.default.createElement("text", {
              x: source_x + (target_x - source_x) / 2 - 30,
              y: target_y + 10,
              textAnchor: "start",
              alignmentBaseline: "middle",
              className: "rp-label"
            }, round_2 === -1 ? target.data.name.split("/")[1] : parseFloat(target.data.name.split("/")[1]).toFixed(round_2), "/", round_3 === -1 ? target.data.name.split("/")[2] : parseFloat(target.data.name.split("/")[2]).toFixed(round_3), "/", round_4 === -1 ? target.data.name.split("/")[3] : parseFloat(target.data.name.split("/")[3]).toFixed(round_4));
          }

          if (showValue2 && showValue3 && showValue5 && !(showValue1 || showValue4)) {
            return /*#__PURE__*/_react.default.createElement("text", {
              x: source_x + (target_x - source_x) / 2 - 34,
              y: target_y + 10,
              textAnchor: "start",
              alignmentBaseline: "middle",
              className: "rp-label"
            }, round_2 === -1 ? target.data.name.split("/")[1] : parseFloat(target.data.name.split("/")[1]).toFixed(round_2), "/", round_3 === -1 ? target.data.name.split("/")[2] : parseFloat(target.data.name.split("/")[2]).toFixed(round_3), "/", round_5 === -1 ? target.data.name.split("/")[4] : parseFloat(target.data.name.split("/")[4]).toFixed(round_5));
          }

          if (showValue2 && showValue4 && showValue5 && !(showValue1 || showValue3)) {
            return /*#__PURE__*/_react.default.createElement("text", {
              x: source_x + (target_x - source_x) / 2 - 30,
              y: target_y + 10,
              textAnchor: "start",
              alignmentBaseline: "middle",
              className: "rp-label"
            }, round_2 === -1 ? target.data.name.split("/")[1] : parseFloat(target.data.name.split("/")[1]).toFixed(round_2), "/", round_4 === -1 ? target.data.name.split("/")[3] : parseFloat(target.data.name.split("/")[3]).toFixed(round_4), "/", round_5 === -1 ? target.data.name.split("/")[4] : parseFloat(target.data.name.split("/")[4]).toFixed(round_5));
          }

          if (showValue3 && showValue4 && showValue5 && !(showValue1 || showValue2)) {
            return /*#__PURE__*/_react.default.createElement("text", {
              x: source_x + (target_x - source_x) / 2 - 30,
              y: target_y + 10,
              textAnchor: "start",
              alignmentBaseline: "middle",
              className: "rp-label"
            }, round_3 === -1 ? target.data.name.split("/")[2] : parseFloat(target.data.name.split("/")[2]).toFixed(round_3), "/", round_4 === -1 ? target.data.name.split("/")[3] : parseFloat(target.data.name.split("/")[3]).toFixed(round_4), "/", round_5 === -1 ? target.data.name.split("/")[4] : parseFloat(target.data.name.split("/")[4]).toFixed(round_5));
          }

          if (showValue1 && showValue2 && showValue3 && showValue4 && !showValue5) {
            return /*#__PURE__*/_react.default.createElement("text", {
              x: source_x + (target_x - source_x) / 2 - 42,
              y: target_y + 10,
              textAnchor: "start",
              alignmentBaseline: "middle",
              className: "rp-label"
            }, round_1 === -1 ? target.data.name.split("/")[0] : parseFloat(target.data.name.split("/")[0]).toFixed(round_1), "/", round_2 === -1 ? target.data.name.split("/")[1] : parseFloat(target.data.name.split("/")[1]).toFixed(round_2), "/", round_3 === -1 ? target.data.name.split("/")[2] : parseFloat(target.data.name.split("/")[2]).toFixed(round_3), "/", round_4 === -1 ? target.data.name.split("/")[3] : parseFloat(target.data.name.split("/")[3]).toFixed(round_4));
          }

          if (showValue1 && showValue2 && showValue3 && showValue5 && !showValue4) {
            return /*#__PURE__*/_react.default.createElement("text", {
              x: source_x + (target_x - source_x) / 2 - 42,
              y: target_y + 10,
              textAnchor: "start",
              alignmentBaseline: "middle",
              className: "rp-label"
            }, round_1 === -1 ? target.data.name.split("/")[0] : parseFloat(target.data.name.split("/")[0]).toFixed(round_1), "/", round_2 === -1 ? target.data.name.split("/")[1] : parseFloat(target.data.name.split("/")[1]).toFixed(round_2), "/", round_3 === -1 ? target.data.name.split("/")[2] : parseFloat(target.data.name.split("/")[2]).toFixed(round_3), "/", round_5 === -1 ? target.data.name.split("/")[4] : parseFloat(target.data.name.split("/")[4]).toFixed(round_5));
          }

          if (showValue1 && showValue2 && showValue4 && showValue5 && !showValue3) {
            return /*#__PURE__*/_react.default.createElement("text", {
              x: source_x + (target_x - source_x) / 2 - 42,
              y: target_y + 10,
              textAnchor: "start",
              alignmentBaseline: "middle",
              className: "rp-label"
            }, round_1 === -1 ? target.data.name.split("/")[0] : parseFloat(target.data.name.split("/")[0]).toFixed(round_1), "/", round_2 === -1 ? target.data.name.split("/")[1] : parseFloat(target.data.name.split("/")[1]).toFixed(round_2), "/", round_4 === -1 ? target.data.name.split("/")[3] : parseFloat(target.data.name.split("/")[3]).toFixed(round_4), "/", round_5 === -1 ? target.data.name.split("/")[4] : parseFloat(target.data.name.split("/")[4]).toFixed(round_5));
          }

          if (showValue1 && showValue3 && showValue4 && showValue5 && !showValue2) {
            return /*#__PURE__*/_react.default.createElement("text", {
              x: source_x + (target_x - source_x) / 2 - 42,
              y: target_y + 10,
              textAnchor: "start",
              alignmentBaseline: "middle",
              className: "rp-label"
            }, round_1 === -1 ? target.data.name.split("/")[0] : parseFloat(target.data.name.split("/")[0]).toFixed(round_1), "/", round_3 === -1 ? target.data.name.split("/")[2] : parseFloat(target.data.name.split("/")[2]).toFixed(round_3), "/", round_4 === -1 ? target.data.name.split("/")[3] : parseFloat(target.data.name.split("/")[3]).toFixed(round_4), "/", round_5 === -1 ? target.data.name.split("/")[4] : parseFloat(target.data.name.split("/")[4]).toFixed(round_5));
          }

          if (showValue2 && showValue3 && showValue4 && showValue5 && !showValue1) {
            return /*#__PURE__*/_react.default.createElement("text", {
              x: source_x + (target_x - source_x) / 2 - 42,
              y: target_y + 10,
              textAnchor: "start",
              alignmentBaseline: "middle",
              className: "rp-label"
            }, round_2 === -1 ? target.data.name.split("/")[1] : parseFloat(target.data.name.split("/")[1]).toFixed(round_2), "/", round_3 === -1 ? target.data.name.split("/")[2] : parseFloat(target.data.name.split("/")[2]).toFixed(round_3), "/", round_4 === -1 ? target.data.name.split("/")[3] : parseFloat(target.data.name.split("/")[3]).toFixed(round_4), "/", round_5 === -1 ? target.data.name.split("/")[4] : parseFloat(target.data.name.split("/")[4]).toFixed(round_5));
          }

          if (showValue1 && showValue2 && showValue3 && showValue4 && showValue5) {
            return /*#__PURE__*/_react.default.createElement("text", {
              x: source_x + (target_x - source_x) / 2 - 48,
              y: target_y + 10,
              textAnchor: "start",
              alignmentBaseline: "middle",
              className: "rp-label"
            }, round_1 === -1 ? target.data.name.split("/")[0] : parseFloat(target.data.name.split("/")[0]).toFixed(round_1), "/", round_2 === -1 ? target.data.name.split("/")[1] : parseFloat(target.data.name.split("/")[1]).toFixed(round_2), "/", round_3 === -1 ? target.data.name.split("/")[2] : parseFloat(target.data.name.split("/")[2]).toFixed(round_3), "/", round_4 === -1 ? target.data.name.split("/")[3] : parseFloat(target.data.name.split("/")[3]).toFixed(round_4), "/", round_5 === -1 ? target.data.name.split("/")[4] : parseFloat(target.data.name.split("/")[4]).toFixed(round_5));
          } else return null;
        }
      })());
    }
  }
}

Branch.defaultProps = {
  branchStyle: {
    strokeWidth: 2,
    stroke: "grey"
  },
  labelStyle: {}
};
var _default = Branch;
exports.default = _default;
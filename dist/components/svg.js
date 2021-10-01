"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function SVG(props) {
  const {
    width,
    height,
    padding
  } = props,
        new_props = {
    width: width - 2 * padding,
    height: height - 2 * padding,
    transform: "translate(".concat(padding, ", ", 0, ")")
  };
  return /*#__PURE__*/_react.default.createElement("svg", {
    width: width,
    height: height,
    id: "svg-chart",
    style: {
      borderStyle: props.borderStyle,
      borderWidth: props.borderWidth,
      borderColor: props.borderColor
    }
  }, /*#__PURE__*/_react.default.cloneElement(props.children, new_props));
}

SVG.defaultProps = {
  padding: 50,
  margin: 20,
  borderColor: "lightgrey",
  id: "svg-chart"
};
var _default = SVG;
exports.default = _default;
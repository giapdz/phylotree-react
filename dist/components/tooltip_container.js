"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function TooltipContainer(props) {
  const {
    width,
    height,
    tooltip_width,
    tooltip_height,
    x,
    y,
    children
  } = props,
        correct_x = x < width / 2 ? x : x - tooltip_width,
        correct_y = y < height / 2 ? y : y - tooltip_height;
  return /*#__PURE__*/_react.default.createElement("g", {
    transform: "translate(".concat(correct_x, ", ").concat(correct_y, ")")
  }, children);
}

var _default = TooltipContainer;
exports.default = _default;
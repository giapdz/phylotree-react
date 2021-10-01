"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function text_width(text, size, max_width) {
  const width = Math.min(max_width, text.length);
  return width * size * 0.60009765625;
}

var _default = text_width;
exports.default = _default;
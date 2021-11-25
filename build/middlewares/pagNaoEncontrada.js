"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const pagNaoEncontrada = (request, response) => response.status(404).json({
  message: `Ops, "${request.method}" para a página "${request.path}" nao foi encontrado`
});

var _default = pagNaoEncontrada;
exports.default = _default;
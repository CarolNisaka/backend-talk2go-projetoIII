"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const erro = (error, request, response, next) => {
  console.log(error);
  response.status(error.status || 500).json({
    message: error.message || 'Ops, está página está com erro'
  });
};

var _default = erro;
exports.default = _default;
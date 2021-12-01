"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const errorHandlingMiddleware = (err, request, response, next) => {
  console.log(err);
  response.status(err.status || 500).json({
    message: err.message || 'Ops, está página está com erro'
  });
};

var _default = errorHandlingMiddleware;
exports.default = _default;
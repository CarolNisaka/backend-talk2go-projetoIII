"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

//1) Criação de uma CLASSE para erros
class InvalidBodyRequestExcpetion extends Error {
  constructor(message) {
    super();
    this.message = message;
    this.status = 400;
  }

}

var _default = InvalidBodyRequestExcpetion;
exports.default = _default;
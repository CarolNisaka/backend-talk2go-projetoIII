"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class UserExiststExcpetion extends Error {
  constructor() {
    super();
    this.message = 'E-mail já existente';
    this.status = 400;
  }

}

var _default = UserExiststExcpetion;
exports.default = _default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const mapearRequest = (request, response, next) => {
  console.log(`Recebendo o "${request.method}" da rota "${request.path}"`);
  next();
};

var _default = mapearRequest;
exports.default = _default;
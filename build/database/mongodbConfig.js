"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

const iniciaMongoConection = () => {
  (0, _mongoose.connect)(process.env.MONGODB_URI).then(() => console.log('Conectado ao database')).catch(error => console.log(error));
};

var _default = iniciaMongoConection;
exports.default = _default;
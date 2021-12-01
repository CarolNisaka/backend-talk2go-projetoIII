"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _authController = _interopRequireDefault(require("./controllers/authController"));

var _atendimentoController = _interopRequireDefault(require("./controllers/atendimentoController"));

var _clienteController = _interopRequireDefault(require("./controllers/clienteController"));

var _oportunidadeController = _interopRequireDefault(require("./controllers/oportunidadeController"));

var _viagemController = _interopRequireDefault(require("./controllers/viagemController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = (0, _express.Router)();
router.use('/auth', _authController.default);
router.use('/atendimento', _atendimentoController.default);
router.use('/cliente', _clienteController.default);
router.use('/viagem', _viagemController.default);
router.use('/oportunidade', _oportunidadeController.default);
var _default = router;
exports.default = _default;
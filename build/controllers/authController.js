"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var yup = _interopRequireWildcard(require("yup"));

var _Usuario = _interopRequireDefault(require("../models/Usuario"));

var _InvalidBodyRequest = _interopRequireDefault(require("../exceptions/InvalidBodyRequest"));

var _UserExistsExceptions = _interopRequireDefault(require("../exceptions/UserExistsExceptions"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const router = (0, _express.Router)(); //1) Rota que registra um novo usuario

router.post('/register', async (request, response, next) => {
  try {
    const schema = yup.object().shape({
      nome: yup.string().required('Campo obrigatório').min(6, 'Minímo 6 letras').max(100, 'Máximo 100 letras'),
      email: yup.string().required('Campo obrigatório').email('Formato inválido'),
      senha: yup.string().required('Campo obrigatório').min(6, 'Mínimo 6 caracteres').max(10, 'Máximo 10 caracteres'),
      cpf: yup.string().required('Campo obrigatório').min(14, 'CPF no formato 111.222.333-44')
    });

    try {
      //o validate é uma promisse, por isso o async (na linha da rota) e o await. Coloca no try catch para pegar os errors detalhados
      await schema.validate(request.body, {
        abortEarly: false
      }); //valida o schema e se tiver problema apresenta err e o abortEarly false avisa de uma vez tudo que tem err
    } catch (error) {
      const errors = error.inner.map(err => ({
        field: err.path,
        error: err.errors[0]
      })); //depois do try catch que capta o erro, faz o throw

      throw new _InvalidBodyRequest.default(errors);
    } //depois do try catch que valida se os dados foram preenchidos corretamente, vou verificar se o email ja existe na base


    const foundUser = await _Usuario.default.findOne({
      email: request.body.email
    });

    if (!foundUser) {
      throw new _UserExistsExceptions.default();
    }

    response.status(201).json(request.body);
  } catch (error) {
    next(error);
  }
}); //2) Rota de login

router.post('/login', (request, response, next) => {
  try {
    console.log(request.body);
    throw new Error(); //Error é o err padrao do JavaScript se tiver problema na validação

    response.status(200).json(request.body);
  } catch (error) {
    next(error);
  }
});
var _default = router;
exports.default = _default;
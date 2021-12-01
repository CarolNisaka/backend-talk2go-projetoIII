"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

//CONCEITOS RELEVANTES
//O usuário está logo abaixo do PDV
//Privilegios
// Adm: cria, edita e deleta tudo
// Gestor: cria e edita cliente, viagem e oportunidade e enxerga painel compilado por PDV
// **(nao entra agora)Financeiro: após status VENDA, somente esse perfil edita financeiro de uma venda
// Consultor: cria e edita cliente, viagem e oportunidade e enxerga seu proprio painel
//PDV
//CONSULTOR
//ATENDIMENTO (um consultor e um cliente)
//CLIENTE (diversos consultores e diversas viagens e diversas oportunidades)
//VIAGEM (diversos consultores e um cliente)
//OPORTUNIDADE (um consultor e um cliente)
//1
const usuarioSchema = new _mongoose.Schema({
  pdvs: [{
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'pdv'
  }],
  atendimentos: [{
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'atendimento'
  }],
  clientes: [{
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'cliente'
  }],
  viagens: [{
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'viagem'
  }],
  oportunidades: [{
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'oportunidade'
  }],
  nome: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 100
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  //precisa conter @agaxtur no e-mail
  senha: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 10
  },
  telefone: {
    type: String
  },
  cpf: {
    type: String,
    required: true,
    minlength: 14,
    maxlength: 14
  },
  foto: {
    type: String
  },
  role: {
    type: String,
    enum: ['Adm', 'Gestor', 'Financeiro', 'Consultor'],
    default: 'Consultor'
  }
}, {
  timestamps: true
}); //3

const Usuario = (0, _mongoose.model)('usuario', usuarioSchema); //4

var _default = Usuario;
exports.default = _default;
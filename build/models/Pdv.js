"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

// CONCEITOS RELEVANTES
// Um PDV é uma agencia - pode ser física ou não
// Um PDV tem um array de usuários a serem categorizados como (Adm / Gestor / Financeiro (nao entra agora mas deixar previsto) / Consultor)
// Cada PDV tem sua url: www.talk2go.com.br/lojaeldorado
//PDV
//CONSULTOR
//ATENDIMENTO (um consultor e um cliente)
//CLIENTE (diversos consultores e diversas viagens e diversas oportunidades)
//VIAGEM (diversos consultores e um cliente)
//OPORTUNIDADE (um consultor e um cliente)
//1
//2 - o que é array aqui coloco no plural?
const pdvSchema = new _mongoose.Schema({
  usuarios: [{
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'usuario'
  }],
  clientes: [{
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'cliente'
  }],
  atendimentos: [{
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'atendimento'
  }],
  viagens: [{
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'viagem'
  }],
  oportunidades: [{
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'oportunidade'
  }],
  loja: {
    type: String,
    required: true,
    minlength: 5
  },
  cnpj: {
    type: String,
    required: true,
    minlength: 18,
    maxlength: 18
  },
  //um cnpj 13.668.087/0001-11
  responsavel: {
    type: String,
    required: true,
    minlength: 6
  }
}, {
  timestamps: true
}); //3

const Pdv = (0, _mongoose.model)('pdv', pdvSchema); //4

var _default = Pdv;
exports.default = _default;
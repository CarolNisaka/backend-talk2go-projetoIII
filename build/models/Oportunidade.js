"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

//CONCEITOS RELEVANTES
//Uma "oportunidade de venda" é um array de produtos que podem ser vendidos a um cliente
//Uma "oportinidade de venda" tem o seguinte array de status: sondagem / fazer proposta / fazer follow up / venda / desistencia
//Uma o"portunidade de venda" vira ou nao uma venda!!
//Oportunidade é de UM consultor
//Terá valor associado a ela. Após conferencia de financeiro, valor não é mais editavel
//PDV
//CONSULTOR
//ATENDIMENTO (um consultor e um cliente)
//CLIENTE (diversos consultores e diversas viagens e diversas oportunidades)
//VIAGEM (diversos consultores e um cliente)
//OPORTUNIDADE (um consultor e um cliente)
const oportunidadeSchema = new _mongoose.Schema({
  pdv: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'pdv'
  },
  usuarios: [{
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'usuario'
  }],
  clientes: [{
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'cliente'
  }],
  viagem: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'viagem'
  },
  produtos: {
    type: String,
    enum: ['passagemAerea', 'hotel', 'cruzeiro', 'seguro', 'carro', 'transfer', 'passeio', 'circuito', 'outros']
  },
  status: [{
    type: String,
    enum: ['sondagem', 'fazerProposta', 'followUp', 'negociacao', 'venda', 'desistencia']
  }],
  valorInicialDaOportunidade: {
    type: String
  },
  rentabilidadeInicialDaOportunidade: {
    type: String
  },
  valorFinaldaOportunidade: {
    type: String
  },
  valorDescontoLoja: {
    type: String
  },
  valorDescontoOperador: {
    type: String
  },
  valorComissao: {
    type: String
  },
  valorTaxas: {
    type: String
  },
  valorSemTaxas: {
    type: String
  },
  recebimentoDinheiro: {
    type: String
  },
  recebimentoCartao: {
    type: String
  },
  valorPagodaOportunidade: {
    type: String
  },
  saldo: {
    type: String
  },
  status2: {
    type: String,
    enum: ['lançado', 'revisado']
  }
}, {
  timestamps: true
});
const Oportunidade = (0, _mongoose.model)('oportunidade', oportunidadeSchema);
var _default = Oportunidade;
exports.default = _default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

// CONCEITO RELEVANTE
//É apenas um "agrupador" de oportunidade
//Está abaixo de cliente 
//Maior relevancia apenas apos implantação de pos venda, mas tem que estar provisionado e criado
//Uma viagem pode ter mais de um consultor
//PDV
//CONSULTOR
//ATENDIMENTO (um consultor e um cliente)
//CLIENTE (diversos consultores e diversas viagens e diversas oportunidades)
//VIAGEM (diversos consultores e um cliente)
//OPORTUNIDADE (um consultor e um cliente)
//1
//2)
const viagemSchema = new _mongoose.Schema({
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
  oportunidades: [{
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'oportunidade'
  }],
  nomeDaViagem: {
    type: String
  },
  destino: [{
    type: String
  }],
  dataInicio: {
    type: Date
  },
  dataFim: {
    type: String
  },
  status: {
    type: String,
    enum: ['futuro', 'presente', 'passado']
  }
}, {
  timestamps: true
}); //3

const Viagem = (0, _mongoose.model)('viagem', viagemSchema); //4

var _default = Viagem;
exports.default = _default;
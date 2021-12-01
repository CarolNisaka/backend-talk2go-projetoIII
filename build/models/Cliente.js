"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

//CONCEITOS RELAVANTES
// Um cliente pertence a um PDV (nao travar por conta do online)
//Um mesmo cliente é atendido por mais de um consultor
//Um cliente tem viagem(s) e oportunidade(s) atrelado a ele
//PDV
//CONSULTOR
//ATENDIMENTO (um consultor e um cliente)
//CLIENTE (diversos consultores e diversas viagens e diversas oportunidades)
//VIAGEM (diversos consultores e um cliente)
//OPORTUNIDADE (um consultor e um cliente)
//1
//2 DUVIDA: nascimento coloco como Date o tipo? Clientes relacionados - ta certo? 
const clienteSchema = new _mongoose.Schema({
  pdvs: [{
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'pdv'
  }],
  usuarios: [{
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'usuario'
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
  apelido: {
    type: String,
    maxlength: 50,
    required: true
  },
  nome: {
    type: String,
    maxlength: 60
  },
  telefonePrincipal: {
    type: String
  },
  telefoneSecundario: {
    type: String
  },
  email: {
    type: String
  },
  endereco: {
    type: String
  },
  rg: {
    type: String
  },
  cpf: {
    type: String
  },
  nascimento: {
    type: Date
  },
  passaporte: {
    type: String
  },
  validadePassaporte: {
    type: Date
  },
  vacina: {
    type: String
  },
  foto: {
    type: String
  },
  clientesRelacionados: [{
    type: _mongoose.Schema.Types.ObjectId
  }]
}, {
  timestamps: true
}); //3

var _default = clienteSchema;
exports.default = _default;
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
import { Schema, model } from "mongoose";

//2 - o que é array aqui coloco no plural?
const pdvSchema = new Schema({
    usuarios: [{type: Schema.Types.ObjectId, ref: 'usuario'}],
    clientes: [{type: Schema.Types.ObjectId, ref: 'cliente'}],
    atendimentos: [{type: Schema.Types.ObjectId, ref: 'atendimento'}],
    viagens: [{type: Schema.Types.ObjectId, ref: 'viagem'}],
    oportunidades: [{type: Schema.Types.ObjectId, ref: 'oportunidade'}],
    loja: { type: String, required: true, minlength: 5},
    cnpj: { type: String, required: true, minlength: 18, maxlength:18},
    //um cnpj 13.668.087/0001-11
    responsavel: { type: String, required: true, minlength: 6},

}, {
    timestamps: true,
});

//3
const Pdv = model('pdv', pdvSchema);

//4
export default Pdv;
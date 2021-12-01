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
import { Schema, model } from "mongoose";

//2)
const viagemSchema = new Schema({
    pdv: {type: Schema.Types.ObjectId, ref: 'pdv'},
    usuarios: [{type: Schema.Types.ObjectId, ref:'usuario'}],
    clientes: [{type: Schema.Types.ObjectId, ref: 'cliente'}],
    oportunidades: [{type: Schema.Types.ObjectId, ref:'oportunidade'}],
    nomeDaViagem: {type: String},
    destino: [{ type: String}],
    dataInicio: {type: Date},
    dataFim: {type: String},
    status: {type: String, enum:['futuro', 'presente', 'passado']},


}, {
    timestamps: true,
});

//3
const Viagem = model('viagem', viagemSchema);

//4
export default Viagem;
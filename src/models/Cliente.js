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
import { Schema, model } from "mongoose";

//2 DUVIDA: nascimento coloco como Date o tipo? Clientes relacionados - ta certo? 
const clienteSchema = new Schema({
    pdvs: [{type: Schema.Types.ObjectId, ref: 'pdv'}],
    usuarios: [{type: Schema.Types.ObjectId, ref: 'usuario'}],
    atendimentos: [{type: Schema.Types.ObjectId, ref: 'atendimento'}],
    viagens: [{type: Schema.Types.ObjectId, ref: 'viagem'}],
    oportunidades: [{type: Schema.Types.ObjectId, ref:'oportunidade'}],
    apelido: {type: String, maxlength: 50, required: true},
    nome: {type: String, maxlength: 60 },
    telefonePrincipal: {type: String},
    telefoneSecundario: {type: String},
    email: {type: String},
    endereco: {type: String},
    rg: {type: String},
    cpf: {type: String},
    nascimento: {type: Date},
    passaporte: {type: String},
    validadePassaporte: {type: Date},
    vacina: {type: String},
    foto: {type: String},
    clientesRelacionados: [{type: Schema.Types.ObjectId}],

}, {
    timestamps: true,
});

const Cliente = model('cliente', clienteSchema);


//3
export default Cliente;
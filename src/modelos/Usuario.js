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
import { Schema, model } from "mongoose";


const usuarioSchema = new Schema({
   
    pdv: [{type: Schema.Types.ObjectId, ref: 'pdv'}],
    nome: { type: String, required: true, minlength: 6, maxlength: 100},
    email: { type: String, required: true, unique: true},
    //precisa conter @agaxtur no e-mail
    senha: { type: String, required: true},
    telefone: { type: String},
    cpf: { type: String, required: true, minlength:14, maxlength: 14},
    foto: { type: String},
    role: { type: String, enum: ['Adm', 'Gestor', 'Financeiro', 'Consultor'], default: 'Consultor'},
    

}, {
    timestamps: true,
});

//3
const Usuario = model('usuario', usuarioSchema);

//4
export default Usuario;
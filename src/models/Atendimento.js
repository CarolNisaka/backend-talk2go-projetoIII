//CONCEITO RELEVANTE
//Serve apenas para o primeiro registro de um pedido
//Apos o registro do atendimento ele se encerra - nao editavel.
//Um atendimento vira uma "oportunidade de venda" ou se "encerra". 
//Clicar em continuar para vivar oportunidade e finalizar para encerrar (casos em que um atendimento é uma duvida por exemplo)
// exemplo: comprei na decolar e quero mudar minha viagem (muito frequente no atendimento online)
// No atendimento registra nome provisorio do cliente e busca na lista de clientes provaveis pessoas com esse nickname
//esse nome provisorio e esssa etapa é apenas para não sujar banco de dados com nomes ficticios e atendimentos que nao sao relativos a venda 

// quando um atendimento virar uma oportunidade as infos do pedido sao carregadas para a proxima pagina
//atendimento: nome provisorio / pedido / status (oportunidade de venda" ou se "encerra")

//PDV
//CONSULTOR

//ATENDIMENTO (um consultor e um cliente)
//CLIENTE (diversos consultores e diversas viagens e diversas oportunidades)

//VIAGEM (diversos consultores e um cliente)
//OPORTUNIDADE (um consultor e um cliente)

//1
import {Schema, model} from 'mongoose';

//2 DUVIDA - preciso conseguir "passar esse atendimento pra outro usuario - faço um enum para isso"? Caso do online que vai pra sondagem
const atendimentoSchema = new Schema({
    pdv: {type: Schema.Types.ObjectId, ref: 'pdv'},
    usuario: {type: Schema.Types.ObjectId, ref: 'usuario'},
    cliente: { type: Schema.Types.ObjectId, ref: 'cliente'},
    tipo: {type: String, enum: ['fisico', 'digital']},
    tipoFisico: {type: String, enum: ['presencial', 'remoto','']},
    tipoDigital: {type: String, enum: ['video', 'chat', 'whatsApp', 'email', '']},
    campanha: {type: String, enum: [""]},
    pedido:{type: String},
    status: {type: String, enum: ['continuar', 'finalizar']},

}, {
    timestamps: true,
});

//3
const Atendimento = model('atendimento', atendimentoSchema);

//4
export default Atendimento;

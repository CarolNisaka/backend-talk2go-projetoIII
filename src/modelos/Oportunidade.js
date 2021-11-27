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

import { Schema, model } from "mongoose";

const oportunidadeSchema = new Schema({

}, {
    timestamps: true,
});

const Oportunidade = model('oportunidade', oportunidadeSchema);

export default Oportunidade;
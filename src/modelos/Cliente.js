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

//2
const clienteSchema = new Schema({

}, {
    timestamps: true,
});

//3
export default clienteSchema;
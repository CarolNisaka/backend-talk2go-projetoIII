import { connect } from "mongoose";

const iniciaMongoConection = () => {
    connect(process.env.MONGODB_URI)
    .then(()=> console.log('Conectado ao database'))
    .catch(error => console.log(error));
};

export default iniciaMongoConection;
import InvalidBodyRequestExcpetion from "../exceptions/InvalidBodyRequest";

const validateSchema = async (schema, body) => {
    try {
        //o validate é uma promisse, por isso o async (na linha da rota) e o await. Coloca no try catch para pegar os errors detalhados
        await schema.validate(body, { abortEarly: false}); //valida o schema e se tiver problema apresenta err e o abortEarly false avisa de uma vez tudo que tem err
    } catch (error) {
        const errors = error.inner.map((err) => ({
            field: err.path,
            error: err.errors[0],
        }));
        //depois do try catch que capta o erro, faz o throw
        throw new InvalidBodyRequestExcpetion(errors);
}
};
export default validateSchema;
    

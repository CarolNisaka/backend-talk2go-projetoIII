const erro = (error, request, response, next) => {
    console.log(error);

    response.status(error.status || 500).json({ message: error.message || 'Ops, está página está com erro'});
};

export default erro;
const errorHandlingMiddleware = (err, request, response, next) => {
    console.log(err);

    response.status(err.status || 500).json({ message: err.message || 'Ops, está página está com erro'});
};

export default errorHandlingMiddleware;
const mapearRequest = (request, response, next) => {
    console.log(`Recebendo o "${request.method}" da rota "${request.path}"`);
    next(); 
};
export default mapearRequest;
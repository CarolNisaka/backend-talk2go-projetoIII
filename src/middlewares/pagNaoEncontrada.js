const pagNaoEncontrada = (request, response) => (
    response.status(404).json({ message: `Ops, "${request.method}" para a página "${request.path}" nao foi encontrado`})
);
    


export default pagNaoEncontrada
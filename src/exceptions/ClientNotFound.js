class ClientNotFoundExcpetion extends Error {
    constructor(message) {
        super();
        this.message = "Ops, cliente não encontrado";
        this.status = 400;
    }
}

export default ClientNotFoundExcpetion;
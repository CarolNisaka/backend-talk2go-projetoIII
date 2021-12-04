class ClientExiststExcpetion extends Error {
    constructor() {
        super();
        this.message = 'Ops, já existe um cliente com esse apelido';
        this.status = 400;
    }
}

export default ClientExiststExcpetion;

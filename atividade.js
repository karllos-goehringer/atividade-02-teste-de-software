const Cliente = require('./cliente');
const clientes = require('./dados');
const Compra = require('./compra');

const historicoCompras = [];

function cadastrarCompra(cliente, valor) {
    if(cliente instanceof Cliente && valor >= 0){
        const novaCompra = new Compra(cliente, valor);
        historicoCompras.push(novaCompra);
        return true;
    }else if(valor >= 0){
        throw new Error ('VALOR_DE_COMPRA_NEGATIVO')
    }else if(!cliente instanceof Cliente){
        throw new Error ('CLIENTE_INVALIDO')
    }else if(valor === null || valor === undefined){
        throw new Error ('VALOR_NULO_OU_INDEFINIDO')
    }else{
        throw new Error ('ERRO_DESCONHECIDO')
    }
}

cadastrarCompra(clientes[0], 450.00); // Bronze
cadastrarCompra(clientes[1], 150.00); // Bronze
cadastrarCompra(clientes[5], 350.00); // Prata
cadastrarCompra(clientes[10], 600.00); // Ouro

module.exports = cadastrarCompra;
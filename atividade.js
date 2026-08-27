const Cliente = require('./cliente');
const Compra = require('./compra');

const historicoCompras = [];

function cadastrarCompra(cliente, valor) {
    if (valor === null || valor === undefined || cliente === null || cliente === undefined) {
        throw new Error('VALOR_NULO_OU_INDEFINIDO');
    }
    if (valor < 0) {
        throw new Error('VALOR_DE_COMPRA_NEGATIVO');
    }
    if (!(cliente instanceof Cliente)) {
        throw new Error('CLIENTE_INVALIDO');
    }
    const novaCompra = new Compra(cliente, valor);
    historicoCompras.push(novaCompra);
    return novaCompra.calcularValorFinal();
}

module.exports = cadastrarCompra;
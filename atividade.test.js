const cadastrarCompra = require('./atividade');
const Cliente = require('./cliente');
const clientes = require('./dados');
const Compra = require('./compra');

test('sem passar parâmetro', () => {
    expect(() => cadastrarCompra()).toThrow('VALOR_NULO_OU_INDEFINIDO');
});
test('Compra cliente ouro', () => {
    expect(() => cadastrarCompra(clientes[9],1500).toBe(true));
})
test('Compra cliente prata', () => {
    expect(() => cadastrarCompra(clientes[7],1500).toBe(true));
})
test('Compra cliente bronze', () => {
    expect(() => cadastrarCompra(clientes[2],1500).toBe(true));
})
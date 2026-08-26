import Compra from './Compra.js';
import clientes from './dados.js';


const historicoCompras = [];

function cadastrarCompra(cliente, valor) {
    const novaCompra = new Compra(cliente, valor);
    historicoCompras.push(novaCompra);
    console.log(`✓ Compra de R$ ${valor.toFixed(2)} cadastrada para ${cliente.getNome()}.`);
}
cadastrarCompra(clientes[0], 450.00); // Bronze
cadastrarCompra(clientes[1], 150.00); // Bronze
cadastrarCompra(clientes[5], 350.00); // Prata
cadastrarCompra(clientes[10], 600.00); // Ouro


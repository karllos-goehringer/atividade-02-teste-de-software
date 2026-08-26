import Cliente from './Cliente.js';

export default class Compra {
    _cliente;
    _valorBruto;

    constructor(cliente, valorBruto) {
        this._cliente = cliente;
        this._valorBruto = valorBruto;
    }
    calcularDescontoPorValor() {
        if (this._valorBruto > 500) {
            return 0.15; // 15%
        } else if (this._valorBruto > 400) {
            return 0.10; // 10%
        } else if (this._valorBruto > 200) {
            return 0.05; // 5%
        }
        return 0; 
    }
    calcularBonusPorCategoria() {
        const classe = this._cliente.getClasse().toLowerCase();
        
        switch (classe) {
            case 'ouro':
                return 0.05; 
            case 'prata':
                return 0.03;
            case 'bronze':
            default:
                return 0;
        }
    }
    getPorcentagemDescontoTotal() {
        const descValor = this.calcularDescontoPorValor();
        const descCategoria = this.calcularBonusPorCategoria();
        return descValor + descCategoria;
    }
    calcularValorFinal() {
        const descontoTotal = this.getPorcentagemDescontoTotal();
        return this._valorBruto * (1 - descontoTotal);
    }

    toString() {
        const percDesconto = (this.getPorcentagemDescontoTotal() * 100).toFixed(0);
        const valorFinal = this.calcularValorFinal().toFixed(2);
        return `\n--- Resumo da Compra ---` +
               `\nCliente: ${this._cliente.getNome()} (${this._cliente.getClasse()})` +
               `\nValor Bruto: R$ ${this._valorBruto.toFixed(2)}` +
               `\nDesconto Aplicado: ${percDesconto}%` +
               `\nValor Final com Desconto: R$ ${valorFinal}`;
    }
}
const cadastrarCompra = require('./atividade');
const Cliente = require('./cliente');
const clientes = require('./dados');
const Compra = require('./compra');
const EncurtadorUrl = require('./encurtadorUrl')
//ERROS DE COMPRA
describe('Erros de Compra', () => {
test('sem passar parâmetro deve lançar erro', () => {
    expect(() => cadastrarCompra()).toThrow('VALOR_NULO_OU_INDEFINIDO');
});

test('valor de compra negativo', () => {
    expect(() => cadastrarCompra(clientes[9],-1)).toThrow('VALOR_DE_COMPRA_NEGATIVO');
});
test('cliente inválido', () => {
    expect(() => cadastrarCompra('CLIENTE_INDEFINIDO',1000).toThrow("CLIENTE_INVALIDO"))
})
});
//COMPRA CORRETAS
describe('Testes de Compra corretas', () => {
test('Compra cliente ouro com valor 1500 (20% desc total)', () => {
    expect(cadastrarCompra(clientes[9], 1500)).toBe(1200);
});

test('Compra cliente prata com valor 1500 (18% desc total)', () => {
    expect(cadastrarCompra(clientes[7], 1500)).toBe(1230);
});

test('Compra cliente bronze com valor 1500 (15% desc total)', () => {
    expect(cadastrarCompra(clientes[2], 1500)).toBe(1275);
});
});
// MARGENS DE COMPRA (VALORES LIMITES)
describe('Testes de Margens de Compra (Valores Limite)', () => {

    test('Limite inicial e superior para 0% de desconto (0.00 e 200.00)', () => {
        expect(cadastrarCompra(clientes[2], 0.00)).toBe(0);
        
        expect(cadastrarCompra(clientes[2], 200.00)).toBe(200.00);
    });

    test('Fronteira e limite superior para 5% de desconto (200.01 e 400.00)', () => {
        expect(cadastrarCompra(clientes[2], 200.01)).toBeCloseTo(190.0095, 4);

        expect(cadastrarCompra(clientes[2], 400.00)).toBe(380.00);
    });

    test('Fronteira e limite superior para 10% de desconto (401.00 / 400.01 e 500.00)', () => {
        expect(cadastrarCompra(clientes[2], 400.01)).toBeCloseTo(360.009, 3);

        expect(cadastrarCompra(clientes[2], 500.00)).toBe(450.00);
    });

    test('Fronteira inicial para 15% de desconto (500.01)', () => {
        expect(cadastrarCompra(clientes[2], 500.01)).toBeCloseTo(425.0085, 4);
    });

});
//ERROS DE CLIENTES
describe('Erros de Clientes', () => {
test('classe do cliente inexistente', () => {
    expect(() => new Cliente('João', 'CLASSE_INEXISTENTE')).toThrow('CLASSE_INVALIDA');
});
test('nome cliente nulo', () => {
    expect(() => new Cliente(null, 'CLASSE_INEXISTENTE')).toThrow('NOME_NULO');
});
});
//Testes encurtador
describe('EncurtadorUrl - Testes de Sucesso (Acertos)', () => {
  beforeEach(() => {
    // Limpa o banco em memória e reinicia o contador antes de cada teste
    EncurtadorUrl.urls.clear();
    EncurtadorUrl.contador = 1;
  });

  test('Deve encurtar uma URL válida com sucesso', () => {
    const urlOriginal = 'https://meusite.com/artigo-longo';
    const urlCurta = EncurtadorUrl.encurtar(urlOriginal);

    expect(urlCurta).toBe('https://curto.link/1');
    expect(EncurtadorUrl.urls.has('1')).toBe(true);
  });

  test('Deve expandir uma URL encurtada com sucesso', () => {
    const urlOriginal = 'https://meusite.com/produto/123';
    const urlCurta = EncurtadorUrl.encurtar(urlOriginal);
    const resultado = EncurtadorUrl.expandir(urlCurta);

    expect(resultado).toBe(urlOriginal);
  });

  test('Deve encurtar múltiplas URLs gerando códigos sequenciais em Base 62', () => {
    const url1 = EncurtadorUrl.encurtar('https://site.com/1');
    const url2 = EncurtadorUrl.encurtar('https://site.com/2');

    expect(url1).toBe('https://curto.link/1');
    expect(url2).toBe('https://curto.link/2');
    expect(EncurtadorUrl.expandir(url1)).toBe('https://site.com/1');
    expect(EncurtadorUrl.expandir(url2)).toBe('https://site.com/2');
  });
});

describe('EncurtadorUrl - Testes de Falha (Forçando Erros)', () => {
  beforeEach(() => {
    EncurtadorUrl.urls.clear();
    EncurtadorUrl.contador = 1;
  });

  test('Deve lançar erro ao tentar encurtar valores inválidos (null, undefined, números)', () => {
    expect(() => EncurtadorUrl.encurtar(null)).toThrow("URL inválida fornecida.");
    expect(() => EncurtadorUrl.encurtar(undefined)).toThrow("URL inválida fornecida.");
    expect(() => EncurtadorUrl.encurtar(12345)).toThrow("URL inválida fornecida.");
    expect(() => EncurtadorUrl.encurtar('')).toThrow("URL inválida fornecida.");
  });

  test('Deve lançar erro ao tentar expandir valores inválidos', () => {
    expect(() => EncurtadorUrl.expandir(null)).toThrow("URL encurtada inválida fornecida.");
    expect(() => EncurtadorUrl.expandir(undefined)).toThrow("URL encurtada inválida fornecida.");
    expect(() => EncurtadorUrl.expandir('')).toThrow("URL encurtada inválida fornecida.");
  });

  test('Deve lançar erro ao tentar expandir uma URL que não existe no mapa', () => {
    const urlInexistente = 'https://curto.link/codigoInexistente';

    expect(() => EncurtadorUrl.expandir(urlInexistente)).toThrow("URL não encontrada.");
  });
});
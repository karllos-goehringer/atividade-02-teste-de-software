const cadastrarCompra = require('./atividade');
const Cliente = require('./cliente');
const clientes = require('./dados');
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
describe('EncurtadorUrl - Validação de Código Válido (8 a 16 caracteres)', () => {
  beforeEach(() => {
    EncurtadorUrl.urls.clear();
    EncurtadorUrl.contador = 3521614606208;
  });

  test('Deve aceitar códigos válidos com caracteres permitidos (-, _, ., ~)', () => {
    expect(() => EncurtadorUrl.validarCodigo("abc123-_")).not.toThrow(); // 8 chars
    expect(() => EncurtadorUrl.validarCodigo("a.b~c_1-23456789")).not.toThrow(); // 16 chars
  });

  test('Deve recusar códigos com menos de 8 caracteres', () => {
    expect(() => EncurtadorUrl.validarCodigo("1234567")).toThrow("Código inválido");
  });

  test('Deve recusar códigos com mais de 16 caracteres', () => {
    expect(() => EncurtadorUrl.validarCodigo("12345678901234567")).toThrow("Código inválido");
  });

  test('Deve recusar códigos com caracteres proibidos (@, !, $, espaços)', () => {
    expect(() => EncurtadorUrl.validarCodigo("abc1234@")).toThrow("Código inválido");
    expect(() => EncurtadorUrl.validarCodigo("abc 12345")).toThrow("Código inválido");
    expect(() => EncurtadorUrl.validarCodigo("abc!12345")).toThrow("Código inválido");
  });

  test('Deve gerar URL encurtada dentro do padrão exigido', () => {
    const curta = EncurtadorUrl.encurtar('https://meusite.com');
    const codigo = curta.split('/').pop();

    expect(codigo.length).toBeGreaterThanOrEqual(8);
    expect(codigo.length).toBeLessThanOrEqual(16);
    expect(EncurtadorUrl.expandir(curta)).toBe('https://meusite.com');
  });
});
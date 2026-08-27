class EncurtadorUrl {
  static CHARSET = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  static BASE = EncurtadorUrl.CHARSET.length;
  static urls = new Map();
  

  static contador = 3521614606208; 

  static REGEX_CODIGO_VALIDO = /^[a-zA-Z0-9\-\_\.\~]{8,16}$/;

  static validarCodigo(codigo) {
    if (typeof codigo !== 'string' || !this.REGEX_CODIGO_VALIDO.test(codigo)) {
      throw new Error("Código inválido: deve ter de 8 a 16 caracteres e conter apenas letras, números, '-', '_', '.' ou '~'.");
    }
    return true;
  }

  static encode(num) {
    let encoded = "";
    while (num > 0) {
      encoded = this.CHARSET[num % this.BASE] + encoded;
      num = Math.floor(num / this.BASE);
    }
    return encoded;
  }

  static encurtar(urlLonga) {
    if (!urlLonga || typeof urlLonga !== 'string') {
      throw new Error("URL inválida fornecida.");
    }

    const id = this.contador++;
    const codigo = this.encode(id);

    this.validarCodigo(codigo);
    
    this.urls.set(codigo, urlLonga);
    
    return `https://curto.link/${codigo}`;
  }

  static expandir(urlCurta) {
    if (!urlCurta || typeof urlCurta !== 'string') {
      throw new Error("URL encurtada inválida fornecida.");
    }

    const codigo = urlCurta.split('/').pop();
    
    this.validarCodigo(codigo);

    const urlOriginal = this.urls.get(codigo);
    if (!urlOriginal) {
      throw new Error("URL não encontrada.");
    }

    return urlOriginal;
  }
}
module.exports = EncurtadorUrl;
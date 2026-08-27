class EncurtadorUrl {
  static CHARSET = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  static BASE = EncurtadorUrl.CHARSET.length;
  static urls = new Map();
  static contador = 1;

  static encode(num) {
    if (num <= 0 || !Number.isInteger(num)) return "";
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
    this.urls.set(codigo, urlLonga);
    
    return `https://curto.link/${codigo}`;
  }

  static expandir(urlCurta) {
    if (!urlCurta || typeof urlCurta !== 'string') {
      throw new Error("URL encurtada inválida fornecida.");
    }
    const codigo = urlCurta.split('/').pop();
    const urlOriginal = this.urls.get(codigo);
    if (!urlOriginal) {
      throw new Error("URL não encontrada.");
    }

    return urlOriginal;
  }
}
module.exports = EncurtadorUrl;
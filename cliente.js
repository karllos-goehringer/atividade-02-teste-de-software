class Cliente {
   _id;
   _nome;
   _classe;
   static idClasse = 1;
   constructor(nome, classe) {
      if (nome) {
         this._nome = nome;
      } else {
         throw new Error('NOME_NULO');
      }
      if (classe === 'Ouro' || classe === 'Prata' || classe === 'Bronze') {
         this._classe = classe;
      } else {
         throw new Error('CLASSE_INVALIDA')
      }
      this._id = Cliente.idClasse;
      Cliente.idClasse++;
   }
   id() {
      return this._id;
   }
   nome() {
      return this._nome;
   }
   classe() {
      return this._classe;
   }
   toString() {
      let retorno = "\n Cliente " + this._id + ": "
         + "\n nome: " + this._nome +
         "\n classe: " + this._classe;
   };
}
module.exports = Cliente
export default class Cliente {
     _id;
     _nome;
     _classe;
     id = 1;
     constructor(nome,classe){
        this._nome = nome;
        this._classe = classe;
        this._id = this.id;
        id++;
     }
     id(){
        return this._id;
     }
     nome(){
        return this._nome;
     }
     classe(){
        return this._classe;
     }
     toString(){
        let retorno =  "\n Cliente " + this._id + ": "
        + "\n nome: " + this._nome +
        "\n classe: " + this._classe; 
    };
}
export class Telefone{
    public ddd:String
    public numero:String

    constructor(ddd:String, numero:String){
        this.ddd = ddd
        this.numero = numero
    }

    detalhes(){
        return `(${this.ddd}) ${this.numero}`
    }
}
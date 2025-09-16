import { result, testes } from "./enum";

export class Teste{
    public tipo : testes
    public resultado : result

    constructor(tipo:testes, resultado:result){
        this.tipo = tipo
        this.resultado = resultado
    }

}
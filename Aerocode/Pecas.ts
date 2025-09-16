import { statusPeca, tipoPeca } from "./enum"

export class Peças{
    public nome:String
    public tipo:tipoPeca
    public fornecedor:String
    public status:statusPeca
    public aeronave:number

    constructor(nome:String, tipo:tipoPeca, fornecedor:String, status:statusPeca, aeronave:number){
        this.nome = nome
        this.tipo = tipo
        this.fornecedor = fornecedor
        this.status = status
        this.aeronave = aeronave
    }
}
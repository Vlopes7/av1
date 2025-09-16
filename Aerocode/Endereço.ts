export class Endereco {
  public rua: String
  public numero: Number
  public bairro: String
  public cidade: String

  constructor(rua: String, numero: Number, bairro: String, cidade: String) {
    this.rua = rua
    this.numero = numero
    this.bairro = bairro
    this.cidade = cidade
  }

  detalhes(): string {
    return `${this.rua}, ${this.numero} - ${this.bairro}, ${this.cidade}`
  }
}

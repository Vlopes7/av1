import { tipoAeronave } from "./enum";
export class Aeronave {
  public codigo: number;
  public modelo: String;
  public tipo: tipoAeronave;
  public capacidade: number;
  public alcance: number;
  testes: { [nomeDoTeste: string]: string } = {};

  constructor(
    codigo: number,
    modelo: String,
    tipo: tipoAeronave,
    capacidade: number,
    alcance: number
  ) {
    this.codigo = codigo;
    this.modelo = modelo;
    this.tipo = tipo;
    this.capacidade = capacidade;
    this.alcance = alcance;
    this.testes = {};
  }

  detalhes(): String {
    return `--- Aeronave ---
Código: ${this.codigo}
Modelo: ${this.modelo}
Tipo: ${this.tipo}
Capacidade: ${this.capacidade}
Alcance: ${this.alcance} km
Testes: ${JSON.stringify(this.testes, null, 2)}`;
  }
}

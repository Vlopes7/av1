import { Endereco } from "./Endereço";
import { Telefone } from "./Telefone";
import { hierarquia } from "./enum";

export class Funcionario {
  public nome: String;
  public telefone: Telefone;
  public endereco: Endereco;
  public cpf: String;
  public cargo: hierarquia;
  public user: String;
  public senha: String;

  constructor(
    nome: String,
    telefone: Telefone,
    endereco: Endereco,
    cpf: String,
    cargo: hierarquia,
    user: String,
    senha: String
  ) {
    this.nome = nome;
    this.telefone = telefone;
    this.endereco = endereco;
    this.cpf = cpf;
    this.cargo = cargo;
    this.user = user;
    this.senha = senha;
  }

  detalhes(): string {
    return `Nome: ${this.nome}
CPF: ${this.cpf}
Cargo: ${this.cargo}
Telefone: ${this.telefone.detalhes()}
Endereço: ${this.endereco.detalhes()}`;
  }
}

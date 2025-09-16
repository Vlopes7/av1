import { producao } from "./enum";
import { Funcionario } from "./Funcionario";

export class Etapa {
  public nome: string;
  public data: Date;
  public status: producao;
  public funcionario: Array<Funcionario>;
  public aeronave: number;

  constructor(
    nome: string,
    data: Date,
    status: producao,
    funcionario: Array<Funcionario>,
    aeronave: number
  ) {
    this.nome = nome;
    this.data = data;
    this.status = status;
    this.funcionario = funcionario;
    this.aeronave = aeronave;
  }

  detalhes(): string {
    const dia = this.data.getDate().toString().padStart(2, "0");
    const mes = (this.data.getMonth() + 1).toString().padStart(2, "0");
    const ano = this.data.getFullYear();

    const dataFormatada = `${dia}/${mes}/${ano}`;

    const funcionariosDetalhes =
      this.funcionario.length > 0
        ? this.funcionario
            .map(
              (f, i) =>
                `  ${i + 1}. Nome: ${f.nome}
     CPF: ${f.cpf}
     Cargo: ${f.cargo}
     Telefone: ${f.telefone.detalhes()}`
            )
            .join("\n\n")
        : "  Nenhum funcionário atribuído.";

    return [
      `Etapa: ${this.nome}`,
      `Data de conclusão: ${dataFormatada}`,
      `Status: ${this.status}`,
      `Aeronave ID: ${this.aeronave}`,
      `Funcionários envolvidos:\n${funcionariosDetalhes}`,
    ].join("\n");
  }
}

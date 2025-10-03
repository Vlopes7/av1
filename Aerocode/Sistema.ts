import * as fs from "fs";
import * as path from "path";
import { Aeronave } from "./Aeronaves";
import { Endereco } from "./Endereço";
import { statusPeca, producao } from "./enum";
import { Funcionario } from "./Funcionario";
import { Peças } from "./Pecas";
import { Telefone } from "./Telefone";
import { Etapa } from "./Etapa";

const DADOS_PATH = path.join(__dirname, "database.json");

export class Sistema {
  aeronaves: Aeronave[];
  peças: Peças[];
  funcionarios: Funcionario[];
  etapas: Etapa[];

  constructor() {
    this.aeronaves = [];
    this.peças = [];
    this.funcionarios = [];
    this.etapas = [];
    this.carregarDados();
  }

  salvarDados() {
    try {
      const dados = {
        aeronaves: this.aeronaves,
        peças: this.peças,
        funcionarios: this.funcionarios,
        etapas: this.etapas.map((e) => ({
          nome: e.nome,
          data: e.data,
          status: e.status,
          funcionarios: e.funcionario.map((f) => f.cpf),
          aeronave: e.aeronave,
        })),
      };
      fs.writeFileSync(DADOS_PATH, JSON.stringify(dados, null, 2), "utf-8");
    } catch (error) {
      console.error("Erro ao salvar os dados:", error);
    }
  }

  carregarDados() {
    try {
      if (fs.existsSync(DADOS_PATH)) {
        const dadosJSON = fs.readFileSync(DADOS_PATH, "utf-8");
        if (!dadosJSON) return;

        const dados = JSON.parse(dadosJSON);

        this.aeronaves = dados.aeronaves.map(
          (a) =>
            new Aeronave(a.codigo, a.modelo, a.tipo, a.capacidade, a.autonomia)
        );
        this.peças = dados.peças.map(
          (p) => new Peças(p.nome, p.tipo, p.fornecedor, p.status, p.aeronave)
        );

        this.funcionarios = dados.funcionarios.map(
          (f) =>
            new Funcionario(
              f.nome,
              new Telefone(f.telefone.ddd, f.telefone.numero),
              new Endereco(
                f.endereco.rua,
                f.endereco.numero,
                f.endereco.bairro,
                f.endereco.cidade
              ),
              f.cpf,
              f.hierarquia,
              f.login,
              f.senha
            )
        );

        this.etapas = dados.etapas.map((e) => {
          const funcsDaEtapa = e.funcionarios
            .map((cpfFunc) =>
              this.funcionarios.find(
                (funcInstanciado) => funcInstanciado.cpf === cpfFunc
              )
            )
            .filter((f) => f) as Funcionario[];

          const etapa = new Etapa(
            e.nome,
            new Date(e.data),
            e.status,
            funcsDaEtapa,
            e.aeronave
          );
          return etapa;
        });
      }
    } catch (error) {
      console.error("Erro ao carregar os dados:", error);
      this.aeronaves = [];
      this.peças = [];
      this.funcionarios = [];
      this.etapas = [];
    }
  }

  cadastrarAeronave(aeronave: Aeronave) {
    if (this.aeronaves.find((a) => a.codigo === aeronave.codigo)) {
      throw new Error("Código de aeronave já existente");
    }
    this.aeronaves.push(aeronave);
  }

  mostrarAeronaves() {
    return this.aeronaves;
  }

  buscarAeronave(codigo: number): Aeronave {
    const aeronave = this.aeronaves.find((a) => a.codigo === codigo);
    if (!aeronave) {
      throw new Error("Aeronave não encontrada");
    }
    return aeronave;
  }

  cadastrarPeças(peça: Peças) {
    this.peças.push(peça);
  }

  atualizarPeça(nome: string, status: statusPeca) {
    const peça = this.peças.find((a) => a.nome === nome);

    if (!peça) {
      return new Error("Peça não encontrada");
    }

    peça.status = status;
    return peça;
  }

  buscarPeça(nome: string) {
    return this.peças.find((p) => p.nome === nome) || "Peça não encontrada";
  }

  cadastrarFuncionario(funcionario: Funcionario) {
    if (this.funcionarios.find((f) => f.cpf === funcionario.cpf)) {
      return new Error("Usuário já cadastrado com esse CPF");
    }
    this.funcionarios.push(funcionario);
  }

  listarFuncionarios() {
    return this.funcionarios;
  }

  criarEtapa(
    nome: string,
    data: Date,
    status: producao,
    nomesFuncionarios: string[],
    aeronave: number
  ) {
    const funcionariosAssociados: Funcionario[] = [];

    for (const nome of nomesFuncionarios) {
      const func = this.funcionarios.find((f) => f.nome === nome);

      if (!func) {
        console.log(`Funcionário "${nome}" não encontrado e será ignorado`);
        continue;
      }

      funcionariosAssociados.push(func);
    }

    const novaEtapa = new Etapa(
      nome,
      data,
      status,
      funcionariosAssociados,
      aeronave
    );

    return this.adicionarEtapa(novaEtapa);
  }

  adicionarEtapa(task: Etapa) {
    let dado = this.aeronaves.find((c) => c.codigo === task.aeronave);

    if (!dado) {
      return new Error(
        "Aeronave não encontrada através do código: " + task.aeronave
      );
    }

    this.etapas.push(task);
    return `\nEtapa adicionada com sucesso: \n${task.detalhes()}`;
  }

  iniciarEtapa(task: Etapa) {
    task.status = producao.ANDAMENTO;
    const nomesFuncionarios = task.funcionario.map((f) => f.nome);

    const listaFuncionarios = nomesFuncionarios.join(", ");

    return `\nEtapa: ${task.nome} em andamento.
    Funcionários: ${listaFuncionarios}
    Data: ${task.data.toLocaleDateString()}
    `;
  }

  finalizarEtapa(task: Etapa) {
    const index = this.etapas.findIndex((e) => e.nome === task.nome);

    if (index === -1) {
      return new Error(`Erro: Etapa "${task.nome}" não encontrada na lista`);
    }

    if (!this.verificarEtapa(index)) {
      return `Erro: A etapa anterior ainda não foi concluída`;
    }

    this.etapas[index].status = producao.CONCLUIDO;
    this.etapas.splice(index, 1);

    return `${task.nome} concluído e removido da lista de etapas em andamento\n`;
  }

  verificarEtapa(index: number): boolean {
    if (index === 0) return true;

    const etapaAtual = this.etapas[index];
    const etapaAnterior = this.etapas[index - 1];

    if (etapaAnterior.aeronave !== etapaAtual.aeronave) return true;
    return etapaAnterior.status === producao.CONCLUIDO;
  }

  listarEtapas() {
    if (this.etapas.length === 0) {
      return "Nenhuma etapa cadastrada";
    }

    let resultado = "";
    console.log("\n-------------------------------------");
    console.log("Listando todas as Etapas: ");

    for (let i = 0; i < this.etapas.length; i++) {
      const etapa = this.etapas[i];
      resultado += `\nEtapa ${i + 1}:\n${etapa.detalhes()}\n\n`;
    }

    return resultado.trim() + "\n-------------------------------------";
  }

  associarFuncionario(task: Etapa, funcionario: Funcionario) {
    let dado = task.funcionario.find((f) => f.nome === funcionario.nome);

    if (dado) new Error("O usuário já está associado a essa Etapa");

    task.funcionario.push(funcionario);
  }

  funcEtapa(task: string) {
    const dado = this.etapas.find((c) => c.nome === task);

    if (!dado) return "Etapa não encontrada no array etapas";

    const funcionariosDetalhes = dado.funcionario
      .map((f, i) => `\n${i + 1}.\n${f.detalhes()}`)
      .join("\n");

    return `Funcionários associados à etapa '${dado.nome}':\n${funcionariosDetalhes}`;
  }

  fazerTeste(result: string, teste: string, id: number) {
    let dado = this.aeronaves.find((c) => c.codigo === id);

    if (!dado) return `Aeronave com id ${id} não encontrada`;

    dado.testes[teste] = result;

    return dado;
  }
}

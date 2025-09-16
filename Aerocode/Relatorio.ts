import { Sistema } from "./Sistema";
import { producao, statusPeca, testes, result } from "./enum";

export class Relatorio {
  public cliente: String;
  public data: Date;
  public sistema: Sistema;

  constructor(cliente: String, data: Date, sistema: Sistema) {
    this.cliente = cliente;
    this.data = data;
    this.sistema = sistema;
  }

  relatorio(id: number): string {
    const aeronave = this.sistema.aeronaves.find((c) => c.codigo === id);
    const etapas = this.sistema.etapas.filter((c) => c.aeronave === id);
    const pecas = this.sistema.peças.filter((c) => c.aeronave === id);

    if (!aeronave) return `Aeronave com id ${id} não encontrada`;

    const etapasIncompletas = etapas.filter(
      (e) => e.status !== producao.CONCLUIDO
    );
    const pecasNaoProntas = pecas.filter((p) => p.status !== statusPeca.PRONTA);

    const testesRealizados = Object.entries(aeronave.testes);
    const testesAprovados = testesRealizados
      .filter(([_, r]) => r === result.APROVADO)
      .map(([t]) => t);

    const testesEsperados = Object.values(testes);
    const todosTestesOk = testesEsperados.every((t) =>
      testesAprovados.includes(t)
    );

    if (
      etapasIncompletas.length > 0 ||
      pecasNaoProntas.length > 0 ||
      !todosTestesOk
    ) {
      return `ERRO: A aeronave ${aeronave.codigo} não pode ser liberada

Motivos:
${
  etapasIncompletas.length > 0
    ? `- Etapas não concluídas: ${etapasIncompletas
        .map((e) => e.nome)
        .join(", ")}`
    : ""
}
${
  pecasNaoProntas.length > 0
    ? `- Peças não prontas: ${pecasNaoProntas.map((p) => p.nome).join(", ")}`
    : ""
}
${
  !todosTestesOk
    ? "- Nem todos os testes obrigatórios foram realizados e aprovados"
    : ""
}
`;
    }

    return `--- RELATÓRIO DA AERONAVE ${aeronave.codigo} ---

Cliente: ${this.cliente}
Data de entrega: ${this.data.toLocaleDateString()}

Modelo: ${aeronave.modelo}
Tipo: ${aeronave.tipo}
Capacidade: ${aeronave.capacidade}
Alcance: ${aeronave.alcance} km

Etapas realizadas:
${
  etapas.length
    ? etapas.map((e) => `- ${e.nome} (${e.status})`).join("\n")
    : "- Nenhuma etapa registrada"
}

Peças utilizadas:
${
  pecas.length
    ? pecas.map((p) => `- ${p.nome} (${p.status})`).join("\n")
    : "- Nenhuma peça associada"
}

Testes realizados:
${
  testesRealizados.length
    ? testesRealizados.map(([t, r]) => `- ${t}: ${r}`).join("\n")
    : "- Nenhum teste realizado"
}

Situação: Aeronave pronta para entrega

----------------------------------------------------`;
  }
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Relatorio = void 0;
var enum_1 = require("./enum");
var Relatorio = /** @class */ (function () {
    function Relatorio(cliente, data, sistema) {
        this.cliente = cliente;
        this.data = data;
        this.sistema = sistema;
    }
    Relatorio.prototype.relatorio = function (id) {
        var aeronave = this.sistema.aeronaves.find(function (c) { return c.codigo === id; });
        var etapas = this.sistema.etapas.filter(function (c) { return c.aeronave === id; });
        var pecas = this.sistema.peças.filter(function (c) { return c.aeronave === id; });
        if (!aeronave)
            return "Aeronave com id ".concat(id, " n\u00E3o encontrada");
        var etapasIncompletas = etapas.filter(function (e) { return e.status !== enum_1.producao.CONCLUIDO; });
        var pecasNaoProntas = pecas.filter(function (p) { return p.status !== enum_1.statusPeca.PRONTA; });
        var testesRealizados = Object.entries(aeronave.testes);
        var testesAprovados = testesRealizados
            .filter(function (_a) {
            var _ = _a[0], r = _a[1];
            return r === enum_1.result.APROVADO;
        })
            .map(function (_a) {
            var t = _a[0];
            return t;
        });
        var testesEsperados = Object.values(enum_1.testes);
        var todosTestesOk = testesEsperados.every(function (t) {
            return testesAprovados.includes(t);
        });
        if (etapasIncompletas.length > 0 ||
            pecasNaoProntas.length > 0 ||
            !todosTestesOk) {
            return "ERRO: A aeronave ".concat(aeronave.codigo, " n\u00E3o pode ser liberada\n\nMotivos:\n").concat(etapasIncompletas.length > 0
                ? "- Etapas n\u00E3o conclu\u00EDdas: ".concat(etapasIncompletas
                    .map(function (e) { return e.nome; })
                    .join(", "))
                : "", "\n").concat(pecasNaoProntas.length > 0
                ? "- Pe\u00E7as n\u00E3o prontas: ".concat(pecasNaoProntas.map(function (p) { return p.nome; }).join(", "))
                : "", "\n").concat(!todosTestesOk
                ? "- Nem todos os testes obrigatórios foram realizados e aprovados"
                : "", "\n");
        }
        return "--- RELAT\u00D3RIO DA AERONAVE ".concat(aeronave.codigo, " ---\n\nCliente: ").concat(this.cliente, "\nData de entrega: ").concat(this.data.toLocaleDateString(), "\n\nModelo: ").concat(aeronave.modelo, "\nTipo: ").concat(aeronave.tipo, "\nCapacidade: ").concat(aeronave.capacidade, "\nAlcance: ").concat(aeronave.alcance, " km\n\nEtapas realizadas:\n").concat(etapas.length
            ? etapas.map(function (e) { return "- ".concat(e.nome, " (").concat(e.status, ")"); }).join("\n")
            : "- Nenhuma etapa registrada", "\n\nPe\u00E7as utilizadas:\n").concat(pecas.length
            ? pecas.map(function (p) { return "- ".concat(p.nome, " (").concat(p.status, ")"); }).join("\n")
            : "- Nenhuma peça associada", "\n\nTestes realizados:\n").concat(testesRealizados.length
            ? testesRealizados.map(function (_a) {
                var t = _a[0], r = _a[1];
                return "- ".concat(t, ": ").concat(r);
            }).join("\n")
            : "- Nenhum teste realizado", "\n\nSitua\u00E7\u00E3o: Aeronave pronta para entrega\n\n----------------------------------------------------");
    };
    return Relatorio;
}());
exports.Relatorio = Relatorio;

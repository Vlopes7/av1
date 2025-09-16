"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Etapa = void 0;
var Etapa = /** @class */ (function () {
    function Etapa(nome, data, status, funcionario, aeronave) {
        this.nome = nome;
        this.data = data;
        this.status = status;
        this.funcionario = funcionario;
        this.aeronave = aeronave;
    }
    Etapa.prototype.detalhes = function () {
        var dia = this.data.getDate().toString().padStart(2, "0");
        var mes = (this.data.getMonth() + 1).toString().padStart(2, "0");
        var ano = this.data.getFullYear();
        var dataFormatada = "".concat(dia, "/").concat(mes, "/").concat(ano);
        var funcionariosDetalhes = this.funcionario.length > 0
            ? this.funcionario
                .map(function (f, i) {
                return "  ".concat(i + 1, ". Nome: ").concat(f.nome, "\n     CPF: ").concat(f.cpf, "\n     Cargo: ").concat(f.cargo, "\n     Telefone: ").concat(f.telefone.detalhes());
            })
                .join("\n\n")
            : "  Nenhum funcionário atribuído.";
        return [
            "Etapa: ".concat(this.nome),
            "Data de conclus\u00E3o: ".concat(dataFormatada),
            "Status: ".concat(this.status),
            "Aeronave ID: ".concat(this.aeronave),
            "Funcion\u00E1rios envolvidos:\n".concat(funcionariosDetalhes),
        ].join("\n");
    };
    return Etapa;
}());
exports.Etapa = Etapa;

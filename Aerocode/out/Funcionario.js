"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Funcionario = void 0;
var Funcionario = /** @class */ (function () {
    function Funcionario(nome, telefone, endereco, cpf, cargo, user, senha) {
        this.nome = nome;
        this.telefone = telefone;
        this.endereco = endereco;
        this.cpf = cpf;
        this.cargo = cargo;
        this.user = user;
        this.senha = senha;
    }
    Funcionario.prototype.detalhes = function () {
        return "Nome: ".concat(this.nome, "\nCPF: ").concat(this.cpf, "\nCargo: ").concat(this.cargo, "\nTelefone: ").concat(this.telefone.detalhes(), "\nEndere\u00E7o: ").concat(this.endereco.detalhes());
    };
    return Funcionario;
}());
exports.Funcionario = Funcionario;

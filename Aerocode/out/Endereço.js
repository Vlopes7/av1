"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Endereco = void 0;
var Endereco = /** @class */ (function () {
    function Endereco(rua, numero, bairro, cidade) {
        this.rua = rua;
        this.numero = numero;
        this.bairro = bairro;
        this.cidade = cidade;
    }
    Endereco.prototype.detalhes = function () {
        return "".concat(this.rua, ", ").concat(this.numero, " - ").concat(this.bairro, ", ").concat(this.cidade);
    };
    return Endereco;
}());
exports.Endereco = Endereco;

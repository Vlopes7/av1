"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Telefone = void 0;
var Telefone = /** @class */ (function () {
    function Telefone(ddd, numero) {
        this.ddd = ddd;
        this.numero = numero;
    }
    Telefone.prototype.detalhes = function () {
        return "(".concat(this.ddd, ") ").concat(this.numero);
    };
    return Telefone;
}());
exports.Telefone = Telefone;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Aeronave = void 0;
var Aeronave = /** @class */ (function () {
    function Aeronave(codigo, modelo, tipo, capacidade, alcance) {
        this.testes = {};
        this.codigo = codigo;
        this.modelo = modelo;
        this.tipo = tipo;
        this.capacidade = capacidade;
        this.alcance = alcance;
        this.testes = {};
    }
    Aeronave.prototype.detalhes = function () {
        return "--- Aeronave ---\nC\u00F3digo: ".concat(this.codigo, "\nModelo: ").concat(this.modelo, "\nTipo: ").concat(this.tipo, "\nCapacidade: ").concat(this.capacidade, "\nAlcance: ").concat(this.alcance, " km\nTestes: ").concat(JSON.stringify(this.testes, null, 2));
    };
    return Aeronave;
}());
exports.Aeronave = Aeronave;

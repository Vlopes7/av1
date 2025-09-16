"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.result = exports.testes = exports.hierarquia = exports.producao = exports.statusPeca = exports.tipoPeca = exports.tipoAeronave = void 0;
var tipoAeronave;
(function (tipoAeronave) {
    tipoAeronave["COMERCIAL"] = "Comercial";
    tipoAeronave["MILITAR"] = "Militar";
})(tipoAeronave || (exports.tipoAeronave = tipoAeronave = {}));
var tipoPeca;
(function (tipoPeca) {
    tipoPeca["NACIONAL"] = "Nacional";
    tipoPeca["IMPORTADA"] = "Importada";
})(tipoPeca || (exports.tipoPeca = tipoPeca = {}));
var statusPeca;
(function (statusPeca) {
    statusPeca["PRODU\u00C7\u00C3O"] = "Em produ\u00E7\u00E3o";
    statusPeca["TRANSPORTE"] = "Em transporte";
    statusPeca["PRONTA"] = "Pronta para uso";
})(statusPeca || (exports.statusPeca = statusPeca = {}));
var producao;
(function (producao) {
    producao["PENDENTE"] = "Pendente";
    producao["ANDAMENTO"] = "Em andamento";
    producao["CONCLUIDO"] = "Conclu\u00EDdo";
})(producao || (exports.producao = producao = {}));
var hierarquia;
(function (hierarquia) {
    hierarquia["ADMINISTRADOR"] = "Administrador";
    hierarquia["ENGENHEIRO"] = "Engenheiro";
    hierarquia["OPERADOR"] = "Operador";
})(hierarquia || (exports.hierarquia = hierarquia = {}));
var testes;
(function (testes) {
    testes["ELETRICOS"] = "El\u00E9trico";
    testes["HIDRAULICOS"] = "Hidraulico";
    testes["AERODINAMICO"] = "Aerodinamico";
})(testes || (exports.testes = testes = {}));
var result;
(function (result) {
    result["APROVADO"] = "Aprovado";
    result["REPROVADO"] = "Reprovado";
})(result || (exports.result = result = {}));

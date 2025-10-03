"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sistema = void 0;
var fs = __importStar(require("fs"));
var path = __importStar(require("path"));
var Aeronaves_1 = require("./Aeronaves");
var Endere_o_1 = require("./Endere\u00E7o");
var enum_1 = require("./enum");
var Funcionario_1 = require("./Funcionario");
var Pecas_1 = require("./Pecas");
var Telefone_1 = require("./Telefone");
var Etapa_1 = require("./Etapa");
var DADOS_PATH = path.join(__dirname, "database.json");
var Sistema = /** @class */ (function () {
    function Sistema() {
        this.aeronaves = [];
        this.peças = [];
        this.funcionarios = [];
        this.etapas = [];
        this.carregarDados();
    }
    Sistema.prototype.salvarDados = function () {
        try {
            var dados = {
                aeronaves: this.aeronaves,
                peças: this.peças,
                funcionarios: this.funcionarios,
                etapas: this.etapas.map(function (e) { return ({
                    nome: e.nome,
                    data: e.data,
                    status: e.status,
                    funcionarios: e.funcionario.map(function (f) { return f.cpf; }),
                    aeronave: e.aeronave,
                }); }),
            };
            fs.writeFileSync(DADOS_PATH, JSON.stringify(dados, null, 2), "utf-8");
        }
        catch (error) {
            console.error("Erro ao salvar os dados:", error);
        }
    };
    Sistema.prototype.carregarDados = function () {
        var _this = this;
        try {
            if (fs.existsSync(DADOS_PATH)) {
                var dadosJSON = fs.readFileSync(DADOS_PATH, "utf-8");
                if (!dadosJSON)
                    return;
                var dados = JSON.parse(dadosJSON);
                this.aeronaves = dados.aeronaves.map(function (a) {
                    return new Aeronaves_1.Aeronave(a.codigo, a.modelo, a.tipo, a.capacidade, a.autonomia);
                });
                this.peças = dados.peças.map(function (p) { return new Pecas_1.Peças(p.nome, p.tipo, p.fornecedor, p.status, p.aeronave); });
                this.funcionarios = dados.funcionarios.map(function (f) {
                    return new Funcionario_1.Funcionario(f.nome, new Telefone_1.Telefone(f.telefone.ddd, f.telefone.numero), new Endere_o_1.Endereco(f.endereco.rua, f.endereco.numero, f.endereco.bairro, f.endereco.cidade), f.cpf, f.hierarquia, f.login, f.senha);
                });
                this.etapas = dados.etapas.map(function (e) {
                    var funcsDaEtapa = e.funcionarios
                        .map(function (cpfFunc) {
                        return _this.funcionarios.find(function (funcInstanciado) { return funcInstanciado.cpf === cpfFunc; });
                    })
                        .filter(function (f) { return f; });
                    var etapa = new Etapa_1.Etapa(e.nome, new Date(e.data), e.status, funcsDaEtapa, e.aeronave);
                    return etapa;
                });
            }
        }
        catch (error) {
            console.error("Erro ao carregar os dados:", error);
            this.aeronaves = [];
            this.peças = [];
            this.funcionarios = [];
            this.etapas = [];
        }
    };
    Sistema.prototype.cadastrarAeronave = function (aeronave) {
        if (this.aeronaves.find(function (a) { return a.codigo === aeronave.codigo; })) {
            throw new Error("Código de aeronave já existente");
        }
        this.aeronaves.push(aeronave);
    };
    Sistema.prototype.mostrarAeronaves = function () {
        return this.aeronaves;
    };
    Sistema.prototype.buscarAeronave = function (codigo) {
        var aeronave = this.aeronaves.find(function (a) { return a.codigo === codigo; });
        if (!aeronave) {
            throw new Error("Aeronave não encontrada");
        }
        return aeronave;
    };
    Sistema.prototype.cadastrarPeças = function (peça) {
        this.peças.push(peça);
    };
    Sistema.prototype.atualizarPeça = function (nome, status) {
        var peça = this.peças.find(function (a) { return a.nome === nome; });
        if (!peça) {
            return new Error("Peça não encontrada");
        }
        peça.status = status;
        return peça;
    };
    Sistema.prototype.buscarPeça = function (nome) {
        return this.peças.find(function (p) { return p.nome === nome; }) || "Peça não encontrada";
    };
    Sistema.prototype.cadastrarFuncionario = function (funcionario) {
        if (this.funcionarios.find(function (f) { return f.cpf === funcionario.cpf; })) {
            return new Error("Usuário já cadastrado com esse CPF");
        }
        this.funcionarios.push(funcionario);
    };
    Sistema.prototype.listarFuncionarios = function () {
        return this.funcionarios;
    };
    Sistema.prototype.criarEtapa = function (nome, data, status, nomesFuncionarios, aeronave) {
        var funcionariosAssociados = [];
        var _loop_1 = function (nome_1) {
            var func = this_1.funcionarios.find(function (f) { return f.nome === nome_1; });
            if (!func) {
                console.log("Funcion\u00E1rio \"".concat(nome_1, "\" n\u00E3o encontrado e ser\u00E1 ignorado"));
                return "continue";
            }
            funcionariosAssociados.push(func);
        };
        var this_1 = this;
        for (var _i = 0, nomesFuncionarios_1 = nomesFuncionarios; _i < nomesFuncionarios_1.length; _i++) {
            var nome_1 = nomesFuncionarios_1[_i];
            _loop_1(nome_1);
        }
        var novaEtapa = new Etapa_1.Etapa(nome, data, status, funcionariosAssociados, aeronave);
        return this.adicionarEtapa(novaEtapa);
    };
    Sistema.prototype.adicionarEtapa = function (task) {
        var dado = this.aeronaves.find(function (c) { return c.codigo === task.aeronave; });
        if (!dado) {
            return new Error("Aeronave não encontrada através do código: " + task.aeronave);
        }
        this.etapas.push(task);
        return "\nEtapa adicionada com sucesso: \n".concat(task.detalhes());
    };
    Sistema.prototype.iniciarEtapa = function (task) {
        task.status = enum_1.producao.ANDAMENTO;
        var nomesFuncionarios = task.funcionario.map(function (f) { return f.nome; });
        var listaFuncionarios = nomesFuncionarios.join(", ");
        return "\nEtapa: ".concat(task.nome, " em andamento.\n    Funcion\u00E1rios: ").concat(listaFuncionarios, "\n    Data: ").concat(task.data.toLocaleDateString(), "\n    ");
    };
    Sistema.prototype.finalizarEtapa = function (task) {
        var index = this.etapas.findIndex(function (e) { return e.nome === task.nome; });
        if (index === -1) {
            return new Error("Erro: Etapa \"".concat(task.nome, "\" n\u00E3o encontrada na lista"));
        }
        if (!this.verificarEtapa(index)) {
            return "Erro: A etapa anterior ainda n\u00E3o foi conclu\u00EDda";
        }
        this.etapas[index].status = enum_1.producao.CONCLUIDO;
        this.etapas.splice(index, 1);
        return "".concat(task.nome, " conclu\u00EDdo e removido da lista de etapas em andamento\n");
    };
    Sistema.prototype.verificarEtapa = function (index) {
        if (index === 0)
            return true;
        var etapaAtual = this.etapas[index];
        var etapaAnterior = this.etapas[index - 1];
        if (etapaAnterior.aeronave !== etapaAtual.aeronave)
            return true;
        return etapaAnterior.status === enum_1.producao.CONCLUIDO;
    };
    Sistema.prototype.listarEtapas = function () {
        if (this.etapas.length === 0) {
            return "Nenhuma etapa cadastrada";
        }
        var resultado = "";
        console.log("\n-------------------------------------");
        console.log("Listando todas as Etapas: ");
        for (var i = 0; i < this.etapas.length; i++) {
            var etapa = this.etapas[i];
            resultado += "\nEtapa ".concat(i + 1, ":\n").concat(etapa.detalhes(), "\n\n");
        }
        return resultado.trim() + "\n-------------------------------------";
    };
    Sistema.prototype.associarFuncionario = function (task, funcionario) {
        var dado = task.funcionario.find(function (f) { return f.nome === funcionario.nome; });
        if (dado)
            new Error("O usuário já está associado a essa Etapa");
        task.funcionario.push(funcionario);
    };
    Sistema.prototype.funcEtapa = function (task) {
        var dado = this.etapas.find(function (c) { return c.nome === task; });
        if (!dado)
            return "Etapa não encontrada no array etapas";
        var funcionariosDetalhes = dado.funcionario
            .map(function (f, i) { return "\n".concat(i + 1, ".\n").concat(f.detalhes()); })
            .join("\n");
        return "Funcion\u00E1rios associados \u00E0 etapa '".concat(dado.nome, "':\n").concat(funcionariosDetalhes);
    };
    Sistema.prototype.fazerTeste = function (result, teste, id) {
        var dado = this.aeronaves.find(function (c) { return c.codigo === id; });
        if (!dado)
            return "Aeronave com id ".concat(id, " n\u00E3o encontrada");
        dado.testes[teste] = result;
        return dado;
    };
    return Sistema;
}());
exports.Sistema = Sistema;

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
var fs = __importStar(require("fs"));
var readlineSync = __importStar(require("readline-sync"));
var Aeronaves_1 = require("./Aeronaves");
var Endere_o_1 = require("./Endere\u00E7o");
var enum_1 = require("./enum");
var Funcionario_1 = require("./Funcionario");
var Pecas_1 = require("./Pecas");
var Sistema_1 = require("./Sistema");
var Telefone_1 = require("./Telefone");
var Relatorio_1 = require("./Relatorio");
var sistema = new Sistema_1.Sistema();
function gerenciarAeronaves() {
    while (true) {
        console.log("\n--- Gerenciar aeronaves ---");
        var opcao = readlineSync.question("Escolha uma opcao:\n1. Cadastrar Aeronave\n2. Listar Aeronaves\n3. Buscar Aeronave\n0. Voltar\n_");
        switch (opcao) {
            case "1":
                var id = readlineSync.questionInt("ID da aeronave: ");
                var modelo = readlineSync.question("Modelo: ");
                var tipoKeys = Object.keys(enum_1.tipoAeronave).filter(function (key) {
                    return isNaN(Number(key));
                });
                var tipoIndex = readlineSync.keyInSelect(tipoKeys, "Tipo de aeronave:");
                var tipo = enum_1.tipoAeronave[tipoKeys[tipoIndex]];
                var capacidade = readlineSync.questionInt("Capacidade de passageiros: ");
                var autonomia = readlineSync.questionFloat("Autonomia de voo (km): ");
                var novaAeronave = new Aeronaves_1.Aeronave(id, modelo, tipo, capacidade, autonomia);
                sistema.cadastrarAeronave(novaAeronave);
                console.log("Aeronave cadastrada");
                sistema.salvarDados();
                readlineSync.keyInPause();
                break;
            case "2":
                console.log("\n--- Lista de aeronaves ---");
                console.log(sistema.mostrarAeronaves());
                readlineSync.keyInPause();
                break;
            case "3":
                var idBusca = readlineSync.questionInt("Digite o ID da aeronave: ");
                var aeronaveEncontrada = sistema.buscarAeronave(idBusca);
                console.log(aeronaveEncontrada || "Aeronave não encontrada");
                readlineSync.keyInPause();
                break;
            case "0":
                return;
            default:
                console.log("Opção invalida");
                readlineSync.keyInPause();
        }
    }
}
function gerenciarPecas() {
    while (true) {
        console.log("\n--- Gerenciar peças ---");
        var opcao = readlineSync.question("Escolha uma opcao:\n1. Cadastrar Peca\n2. Buscar Peca\n3. Atualizar Status da Peca\n0. Voltar\n_");
        switch (opcao) {
            case "1":
                var nomePeca = readlineSync.question("Nome da peca: ");
                var tipoPecaKeys = Object.keys(enum_1.tipoPeca).filter(function (key) {
                    return isNaN(Number(key));
                });
                var tipoPecaIndex = readlineSync.keyInSelect(tipoPecaKeys, "Tipo da peca:");
                var tipo = enum_1.tipoPeca[tipoPecaKeys[tipoPecaIndex]];
                var fornecedor = readlineSync.question("Fornecedor: ");
                var idAeronave = readlineSync.questionInt("ID da aeronave associada: ");
                var novaPeca = new Pecas_1.Peças(nomePeca, tipo, fornecedor, enum_1.statusPeca.PRODUÇÃO, idAeronave);
                sistema.cadastrarPeças(novaPeca);
                console.log("Peça cadastrada com sucesso");
                sistema.salvarDados();
                readlineSync.keyInPause();
                break;
            case "2":
                var nomeBusca = readlineSync.question("Digite o nome da peca: ");
                console.log(sistema.buscarPeça(nomeBusca) || "Peça não encontrada");
                readlineSync.keyInPause();
                break;
            case "3":
                var nomeAtualizar = readlineSync.question("Digite o nome da peca para atualizar: ");
                var statusKeys = Object.keys(enum_1.statusPeca).filter(function (key) {
                    return isNaN(Number(key));
                });
                var statusIndex = readlineSync.keyInSelect(statusKeys, "Novo Status:");
                var novoStatus = enum_1.statusPeca[statusKeys[statusIndex]];
                console.log(sistema.atualizarPeça(nomeAtualizar, novoStatus));
                sistema.salvarDados();
                readlineSync.keyInPause();
                break;
            case "0":
                return;
            default:
                console.log("Opção invalida");
                readlineSync.keyInPause();
        }
    }
}
function gerenciarFuncionarios() {
    while (true) {
        console.log("\n--- Gerenciar funcionários ---");
        var opcao = readlineSync.question("Escolha uma opcao:\n1. Cadastrar Funcionario\n2. Listar Funcionarios\n0. Voltar\n_");
        switch (opcao) {
            case "1":
                var nome = readlineSync.question("Nome: ");
                var ddd = readlineSync.question("DDD: ");
                var numeroTel = readlineSync.question("Numero de Telefone: ");
                var rua = readlineSync.question("Rua: ");
                var numeroEnd = readlineSync.questionInt("Numero do Endereco: ");
                var bairro = readlineSync.question("Bairro: ");
                var cidade = readlineSync.question("Cidade: ");
                var cpf = readlineSync.question("CPF: ");
                var hierarquiaKeys = Object.keys(enum_1.hierarquia).filter(function (key) {
                    return isNaN(Number(key));
                });
                var hierarquiaIndex = readlineSync.keyInSelect(hierarquiaKeys, "Hierarquia:");
                var cargo = enum_1.hierarquia[hierarquiaKeys[hierarquiaIndex]];
                var login = readlineSync.question("Login: ");
                var senha = readlineSync.question("Senha: ", { hideEchoBack: true });
                var novoFunc = new Funcionario_1.Funcionario(nome, new Telefone_1.Telefone(ddd, numeroTel), new Endere_o_1.Endereco(rua, numeroEnd, bairro, cidade), cpf, cargo, login, senha);
                sistema.cadastrarFuncionario(novoFunc);
                console.log("Funcionário cadastrado");
                sistema.salvarDados();
                readlineSync.keyInPause();
                break;
            case "2":
                console.log("\n--- Lista de funcionários ---");
                console.log(sistema.listarFuncionarios());
                readlineSync.keyInPause();
                break;
            case "0":
                return;
            default:
                console.log("Opção invalida");
                readlineSync.keyInPause();
        }
    }
}
function gerenciarEtapas() {
    var _loop_1 = function () {
        console.log("\n--- Gerenciar etapas de producao ---");
        var opcao = readlineSync.question("Escolha uma opcao:\n1. Criar Etapa\n2. Listar Etapas\n3. Iniciar Etapa\n4. Finalizar Etapa\n0. Voltar\n_");
        switch (opcao) {
            case "1":
                var nomeEtapa = readlineSync.question("Nome da Etapa: ");
                var dataStr = readlineSync.question("Data de Inicio (AAAA-MM-DD): ");
                var idAeronave = readlineSync.questionInt("ID da Aeronave para a etapa: ");
                var nomesFuncionarios = readlineSync
                    .question("Nomes dos funcionarios (separados por virgula): ")
                    .split(",");
                sistema.criarEtapa(nomeEtapa, new Date(dataStr), enum_1.producao.PENDENTE, nomesFuncionarios.map(function (n) { return n.trim(); }), idAeronave);
                console.log("Etapa criada com sucesso!");
                sistema.salvarDados();
                readlineSync.keyInPause();
                break;
            case "2":
                console.log("\n--- Lista de Etapas ---");
                console.log(sistema.listarEtapas());
                readlineSync.keyInPause();
                break;
            case "3":
                var nomeIniciar_1 = readlineSync.question("Nome da etapa para INICIAR: ");
                var etapaIniciar = sistema.etapas.find(function (e) { return e.nome.toLowerCase() === nomeIniciar_1.toLowerCase(); });
                if (etapaIniciar) {
                    console.log(sistema.iniciarEtapa(etapaIniciar));
                    sistema.salvarDados();
                }
                else {
                    console.log("Etapa não encontrada.");
                }
                readlineSync.keyInPause();
                break;
            case "4":
                var nomeFinalizar_1 = readlineSync.question("Nome da etapa para FINALIZAR: ");
                var etapaFinalizar = sistema.etapas.find(function (e) { return e.nome.toLowerCase() === nomeFinalizar_1.toLowerCase(); });
                if (etapaFinalizar) {
                    console.log(sistema.finalizarEtapa(etapaFinalizar));
                    sistema.salvarDados();
                }
                else {
                    console.log("Etapa não encontrada.");
                }
                readlineSync.keyInPause();
                break;
            case "0": return { value: void 0 };
            default:
                console.log("Opção inválida.");
                readlineSync.keyInPause();
        }
    };
    while (true) {
        var state_1 = _loop_1();
        if (typeof state_1 === "object")
            return state_1.value;
    }
}
function realizarTeste() {
    console.log("\n--- Realizar teste em aeronave ---");
    var idAeronave = readlineSync.questionInt("ID da Aeronave: ");
    var testesKeys = Object.keys(enum_1.testes).filter(function (key) { return isNaN(Number(key)); });
    var testeIndex = readlineSync.keyInSelect(testesKeys, "Tipo de teste:");
    var tipoTeste = enum_1.testes[testesKeys[testeIndex]];
    var resultKeys = Object.keys(enum_1.result).filter(function (key) { return isNaN(Number(key)); });
    var resultIndex = readlineSync.keyInSelect(resultKeys, "Resultado do teste:");
    var resultado = enum_1.result[resultKeys[resultIndex]];
    sistema.fazerTeste(resultado, tipoTeste, idAeronave);
    console.log("Teste registrado");
    sistema.salvarDados();
}
function gerarRelatorio() {
    console.log("\n--- Gerar relatorio de aeronave ---");
    var idAeronave = readlineSync.questionInt("ID da Aeronave para gerar relatorio: ");
    var autor = readlineSync.question("Nome do autor do relatorio: ");
    var relatorio = new Relatorio_1.Relatorio(autor, new Date(), sistema);
    var relatorioTexto = relatorio.relatorio(idAeronave);
    console.log(relatorioTexto);
    var timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    var nomeArquivo = "relatorio_aeronave_".concat(idAeronave, "_").concat(timestamp, ".txt");
    try {
        fs.writeFileSync(nomeArquivo, relatorioTexto, "utf-8");
        console.log("\nRelatorio salvo com sucesso no arquivo: ".concat(nomeArquivo));
    }
    catch (error) {
        console.error("\nErro ao salvar o relatorio:", error);
    }
}
function mainMenu() {
    while (true) {
        console.log("\n====== MENU PRINCIPAL ======");
        var escolha = readlineSync.question("Escolha uma opcao:\n" +
            "1. Gerenciar aeronaves\n" +
            "2. Gerenciar pecas\n" +
            "3. Gerenciar funcionarios\n" +
            "4. Gerenciar etapas de Producao\n" +
            "5. Realizar teste\n" +
            "6. Gerar relatorio\n" +
            "0. Sair\n" +
            "> ");
        switch (escolha) {
            case "1":
                gerenciarAeronaves();
                break;
            case "2":
                gerenciarPecas();
                break;
            case "3":
                gerenciarFuncionarios();
                break;
            case "4":
                gerenciarEtapas();
                break;
            case "5":
                realizarTeste();
                readlineSync.keyInPause();
                break;
            case "6":
                gerarRelatorio();
                readlineSync.keyInPause();
                break;
            case "0":
                console.log("Saindo do sistema...");
                sistema.salvarDados();
                return;
            default:
                console.log("Opção inválida");
                readlineSync.keyInPause();
        }
    }
}
mainMenu();

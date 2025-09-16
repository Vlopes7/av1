"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Aeronaves_1 = require("./Aeronaves");
var Endere_o_1 = require("./Endere\u00E7o");
var enum_1 = require("./enum");
var Funcionario_1 = require("./Funcionario");
var Pecas_1 = require("./Pecas");
var Sistema_1 = require("./Sistema");
var Telefone_1 = require("./Telefone");
var enum_2 = require("./enum");
var Etapa_1 = require("./Etapa");
var enum_3 = require("./enum");
var enum_4 = require("./enum");
var Relatorio_1 = require("./Relatorio");
var sistema = new Sistema_1.Sistema();
var a1 = new Aeronaves_1.Aeronave(1010, "modelo1", enum_1.tipoAeronave.COMERCIAL, 300, 30000);
var a2 = new Aeronaves_1.Aeronave(1020, "modelo2", enum_1.tipoAeronave.MILITAR, 500, 200000);
sistema.cadastrarAeronave(a1);
sistema.cadastrarAeronave(a2);
console.log(sistema.mostrarAeronaves());
console.log(sistema.buscarAeronave(1010));
var p1 = new Pecas_1.Peças("peça1", enum_1.tipoPeca.NACIONAL, "fornecedor1", enum_1.statusPeca.PRODUÇÃO, 1010);
sistema.cadastrarPeças(p1);
console.log(sistema.buscarPeça("peça1"));
console.log(sistema.atualizarPeça("peça1", enum_1.statusPeca.TRANSPORTE));
var func2 = new Funcionario_1.Funcionario("pedro", new Telefone_1.Telefone("12", "922222"), new Endere_o_1.Endereco("rua2", 70, "bairro1", "são zé dos campos"), "1992929210", enum_1.hierarquia.ENGENHEIRO, "pedro123", "senha123");
var func1 = new Funcionario_1.Funcionario("vinicius", new Telefone_1.Telefone("12", "98888"), new Endere_o_1.Endereco("rua1", 64, "bairro1", "são zé dos campos"), "1999203045", enum_1.hierarquia.ADMINISTRADOR, "vlopes7", "12345");
sistema.cadastrarFuncionario(func2);
sistema.cadastrarFuncionario(func1);
console.log("Lista de funcionários cadastrados:", sistema.listarFuncionarios());
sistema.adicionarEtapa(new Etapa_1.Etapa("Monitoria", new Date(2005, 0, 24), enum_2.producao.PENDENTE, [func1, func2], 1010));
console.log(sistema.listarEtapas());
var etapaMonitoria = sistema.etapas.find(function (e) { return e.nome === "Monitoria"; });
if (etapaMonitoria) {
    console.log("Iniciando etapa 'Monitoria':", sistema.iniciarEtapa(etapaMonitoria));
}
sistema.criarEtapa("Montagem", new Date(2005, 1, 10), enum_2.producao.PENDENTE, ["vinicius"], 1010);
sistema.criarEtapa("Pintura", new Date(2005, 2, 5), enum_2.producao.PENDENTE, ["pedro"], 1020);
console.log(sistema.listarEtapas());
var etapaMontagem = sistema.etapas.find(function (e) { return e.nome === "Montagem"; });
var etapaPintura = sistema.etapas.find(function (e) { return e.nome === "Pintura"; });
if (etapaMonitoria)
    console.log(sistema.finalizarEtapa(etapaMonitoria));
if (etapaMontagem)
    console.log(sistema.finalizarEtapa(etapaMontagem));
if (etapaPintura)
    sistema.finalizarEtapa(etapaPintura);
console.log(sistema.listarEtapas());
sistema.adicionarEtapa(new Etapa_1.Etapa("testes", new Date(2005, 0, 24), enum_2.producao.PENDENTE, [func1, func2], 1010));
var etapaTestes = sistema.etapas.find(function (e) { return e.nome === "testes"; });
if (etapaTestes) {
    console.log("Funcionários associados à etapa 'testes':", sistema.funcEtapa("testes"));
    console.log(sistema.iniciarEtapa(etapaTestes));
    console.log(sistema.finalizarEtapa(etapaTestes));
}
sistema.fazerTeste(enum_3.result.APROVADO, enum_4.testes.ELETRICOS, 1010);
sistema.fazerTeste(enum_3.result.APROVADO, enum_4.testes.AERODINAMICO, 1010);
sistema.fazerTeste(enum_3.result.APROVADO, enum_4.testes.HIDRAULICOS, 1010);
sistema.atualizarPeça("peça1", enum_1.statusPeca.PRONTA);
var relatorio = new Relatorio_1.Relatorio("Gerson", new Date(), sistema);
console.log(relatorio.relatorio(1010));
console.log(sistema.listarEtapas());

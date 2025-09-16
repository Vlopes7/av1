import { Aeronave } from "./Aeronaves"
import { Endereco } from "./Endereço"
import { hierarquia, statusPeca, tipoAeronave, tipoPeca } from "./enum"
import { Funcionario } from "./Funcionario"
import { Peças } from "./Pecas"
import { Sistema } from "./Sistema"
import { Telefone } from "./Telefone"
import { producao } from "./enum"
import { Etapa } from "./Etapa"
import { result } from "./enum"
import { testes } from "./enum"
import { Relatorio } from "./Relatorio"

const sistema = new Sistema()

let a1 = new Aeronave(1010, "modelo1", tipoAeronave.COMERCIAL, 300, 30000)

let a2 = new Aeronave(1020, "modelo2", tipoAeronave.MILITAR, 500, 200000)

sistema.cadastrarAeronave(a1)
sistema.cadastrarAeronave(a2)
console.log(sistema.mostrarAeronaves())

console.log(sistema.buscarAeronave(1010))

let p1 = new Peças(
  "peça1",
  tipoPeca.NACIONAL,
  "fornecedor1",
  statusPeca.PRODUÇÃO,
  1010
)
sistema.cadastrarPeças(p1)
console.log(sistema.buscarPeça("peça1"))

console.log(sistema.atualizarPeça("peça1", statusPeca.TRANSPORTE))

let func2 = new Funcionario(
  "pedro",
  new Telefone("12", "922222"),
  new Endereco("rua2", 70, "bairro1", "são zé dos campos"),
  "1992929210",
  hierarquia.ENGENHEIRO,
  "pedro123",
  "senha123"
)
let func1 = new Funcionario(
  "vinicius",
  new Telefone("12", "98888"),
  new Endereco("rua1", 64, "bairro1", "são zé dos campos"),
  "1999203045",
  hierarquia.ADMINISTRADOR,
  "vlopes7",
  "12345"
)
sistema.cadastrarFuncionario(func2)
sistema.cadastrarFuncionario(func1)
console.log("Lista de funcionários cadastrados:", sistema.listarFuncionarios())

sistema.adicionarEtapa(
  new Etapa(
    "Monitoria",
    new Date(2005, 0, 24),
    producao.PENDENTE,
    [func1, func2],
    1010
  )
)
console.log(sistema.listarEtapas())

const etapaMonitoria = sistema.etapas.find(e => e.nome === "Monitoria")
if (etapaMonitoria) {
  console.log("Iniciando etapa 'Monitoria':", sistema.iniciarEtapa(etapaMonitoria))
}

sistema.criarEtapa("Montagem", new Date(2005, 1, 10), producao.PENDENTE, ["vinicius"], 1010)
sistema.criarEtapa("Pintura", new Date(2005, 2, 5), producao.PENDENTE, ["pedro"], 1020)
console.log(sistema.listarEtapas())

const etapaMontagem = sistema.etapas.find(e => e.nome === "Montagem")
const etapaPintura = sistema.etapas.find(e => e.nome === "Pintura")
if (etapaMonitoria) console.log(sistema.finalizarEtapa(etapaMonitoria))
if (etapaMontagem) console.log(sistema.finalizarEtapa(etapaMontagem))
if (etapaPintura) sistema.finalizarEtapa(etapaPintura)

console.log(sistema.listarEtapas())

sistema.adicionarEtapa(
  new Etapa(
    "testes",
    new Date(2005, 0, 24),
    producao.PENDENTE,
    [func1, func2],
    1010
  )
)
const etapaTestes = sistema.etapas.find(e => e.nome === "testes")
if (etapaTestes) {
  console.log("Funcionários associados à etapa 'testes':", sistema.funcEtapa("testes"))
  console.log(sistema.iniciarEtapa(etapaTestes))
  console.log(sistema.finalizarEtapa(etapaTestes))
}

sistema.fazerTeste(result.APROVADO, testes.ELETRICOS, 1010)

sistema.fazerTeste(result.APROVADO, testes.AERODINAMICO, 1010)

sistema.fazerTeste(result.APROVADO,testes.HIDRAULICOS, 1010)


sistema.atualizarPeça("peça1", statusPeca.PRONTA)

const relatorio = new Relatorio("Gerson", new Date(), sistema)
console.log(relatorio.relatorio(1010))

console.log(sistema.listarEtapas())

import * as fs from 'fs'
import * as readlineSync from 'readline-sync'
import { Aeronave } from "./Aeronaves"
import { Endereco } from "./Endereço"
import { hierarquia, statusPeca, tipoAeronave, tipoPeca, producao, result, testes } from "./enum"
import { Funcionario } from "./Funcionario"
import { Peças } from "./Pecas"
import { Sistema } from "./Sistema"
import { Telefone } from "./Telefone"
import { Relatorio } from "./Relatorio"

const sistema = new Sistema()

function gerenciarAeronaves() {
    console.log("\n--- Gerenciar aeronaves ---")
    const opcao = readlineSync.question('Escolha uma opcao:\n1. Cadastrar Aeronave\n2. Listar Aeronaves\n3. Buscar Aeronave\n_')
    switch (opcao) {
        case '1':
            const id = readlineSync.questionInt('ID da aeronave: ')
            const modelo = readlineSync.question('Modelo: ')
            const tipoKeys = Object.keys(tipoAeronave).filter(key => isNaN(Number(key)))
            const tipoIndex = readlineSync.keyInSelect(tipoKeys, 'Tipo de aeronave:')
            const tipo = tipoAeronave[tipoKeys[tipoIndex]]
            const capacidade = readlineSync.questionInt('Capacidade de passageiros: ')
            const autonomia = readlineSync.questionFloat('Autonomia de voo (km): ')
            const novaAeronave = new Aeronave(id, modelo, tipo, capacidade, autonomia)
            sistema.cadastrarAeronave(novaAeronave)
            console.log("Aeronave cadastrada")
            sistema.salvarDados()
            break
        case '2':
            console.log("\n--- Lista de aeronaves ---")
            console.log(sistema.mostrarAeronaves())
            break
        case '3':
            const idBusca = readlineSync.questionInt('Digite o ID da aeronave: ')
            const aeronaveEncontrada = sistema.buscarAeronave(idBusca)
            console.log(aeronaveEncontrada || "Aeronave não encontrada")
            break
        default:
            console.log("Opção invalida")
    }
}

function gerenciarPecas() {
    console.log("\n--- Gerenciar peças ---")
    const opcao = readlineSync.question('Escolha uma opcao:\n1. Cadastrar Peca\n2. Buscar Peca\n3. Atualizar Status da Peca\n_')
    switch (opcao) {
        case '1':
            const nomePeca = readlineSync.question('Nome da peca: ')
            const tipoPecaKeys = Object.keys(tipoPeca).filter(key => isNaN(Number(key)))
            const tipoPecaIndex = readlineSync.keyInSelect(tipoPecaKeys, 'Tipo da peca:')
            const tipo = tipoPeca[tipoPecaKeys[tipoPecaIndex]]
            const fornecedor = readlineSync.question('Fornecedor: ')
            const idAeronave = readlineSync.questionInt('ID da aeronave associada: ')
            const novaPeca = new Peças(nomePeca, tipo, fornecedor, statusPeca.PRODUÇÃO, idAeronave)
            sistema.cadastrarPeças(novaPeca)
            console.log("Peça cadastrada com sucesso")
            sistema.salvarDados()
            break
        case '2':
            const nomeBusca = readlineSync.question('Digite o nome da peca: ')
            console.log(sistema.buscarPeça(nomeBusca) || "Peça não encontrada")
            break
        case '3':
            const nomeAtualizar = readlineSync.question('Digite o nome da peca para atualizar: ')
            const statusKeys = Object.keys(statusPeca).filter(key => isNaN(Number(key)))
            const statusIndex = readlineSync.keyInSelect(statusKeys, 'Novo Status:')
            const novoStatus = statusPeca[statusKeys[statusIndex]]
            console.log(sistema.atualizarPeça(nomeAtualizar, novoStatus))
            sistema.salvarDados()
            break
        default:
            console.log("Opção invalida")
    }
}

function gerenciarFuncionarios() {
    console.log("\n--- Gerenciar funcionários ---")
    const opcao = readlineSync.question('Escolha uma opcao:\n1. Cadastrar Funcionario\n2. Listar Funcionarios\n_')
    switch(opcao){
        case '1':
            const nome = readlineSync.question('Nome: ')
            const ddd = readlineSync.question('DDD: ')
            const numeroTel = readlineSync.question('Numero de Telefone: ')
            const rua = readlineSync.question('Rua: ')
            const numeroEnd = readlineSync.questionInt('Numero do Endereco: ')
            const bairro = readlineSync.question('Bairro: ')
            const cidade = readlineSync.question('Cidade: ')
            const cpf = readlineSync.question('CPF: ')
            const hierarquiaKeys = Object.keys(hierarquia).filter(key => isNaN(Number(key)))
            const hierarquiaIndex = readlineSync.keyInSelect(hierarquiaKeys, 'Hierarquia:')
            const cargo = hierarquia[hierarquiaKeys[hierarquiaIndex]]
            const login = readlineSync.question('Login: ')
            const senha = readlineSync.question('Senha: ', {hideEchoBack: true})

            const novoFunc = new Funcionario(
                nome,
                new Telefone(ddd, numeroTel),
                new Endereco(rua, numeroEnd, bairro, cidade),
                cpf,
                cargo,
                login,
                senha
            )
            sistema.cadastrarFuncionario(novoFunc)
            console.log("Funcionário cadastrado")
            sistema.salvarDados()
            break
        case '2':
            console.log("\n--- Lista de funcionários ---")
            console.log(sistema.listarFuncionarios())
            break
        default:
            console.log("Opção invalida")
    }
}

function gerenciarEtapas() {
    console.log("\n--- Gerenciar etapas de producao ---")
     const opcao = readlineSync.question('Escolha uma opcao:\n1. Criar Etapa\n2. Listar Etapas\n3. Iniciar Etapa\n4. Finalizar Etapa\n_')
     switch(opcao){
        case '1':
            const nomeEtapa = readlineSync.question('Nome da Etapa: ')
            const dataStr = readlineSync.question('Data de Inicio (AAAA-MM-DD): ')
            const idAeronave = readlineSync.questionInt('ID da Aeronave para a etapa: ')
            const nomesFuncionarios = readlineSync.question('Nomes dos funcionarios (separados por virgula): ').split(',')
            
            sistema.criarEtapa(nomeEtapa, new Date(dataStr), producao.PENDENTE, nomesFuncionarios.map(n => n.trim()), idAeronave)
            console.log("Etapa criada com sucesso!")
            sistema.salvarDados()
            break
        case '2':
            console.log("\n--- Lista de Etapas ---")
            console.log(sistema.listarEtapas())
            break
        case '3':
            const nomeIniciar = readlineSync.question('Nome da etapa para INICIAR: ')
            const etapaIniciar = sistema.etapas.find(e => e.nome.toLowerCase() === nomeIniciar.toLowerCase())
            if (etapaIniciar) {
                console.log(sistema.iniciarEtapa(etapaIniciar))
                sistema.salvarDados()
            } else {
                console.log("Etapa não encontrada.")
            }
            break
        case '4':
             const nomeFinalizar = readlineSync.question('Nome da etapa para FINALIZAR: ')
            const etapaFinalizar = sistema.etapas.find(e => e.nome.toLowerCase() === nomeFinalizar.toLowerCase())
            if (etapaFinalizar) {
                console.log(sistema.finalizarEtapa(etapaFinalizar))
                sistema.salvarDados()
            } else {
                console.log("Etapa não encontrada.")
            }
            break
        default:
             console.log("Opção inválida.")
     }
}

function realizarTeste() {
    console.log("\n--- Realizar teste em aeronave ---")
    const idAeronave = readlineSync.questionInt('ID da Aeronave: ')
    
    const testesKeys = Object.keys(testes).filter(key => isNaN(Number(key)))
    const testeIndex = readlineSync.keyInSelect(testesKeys, 'Tipo de teste:')
    const tipoTeste = testes[testesKeys[testeIndex]]

    const resultKeys = Object.keys(result).filter(key => isNaN(Number(key)))
    const resultIndex = readlineSync.keyInSelect(resultKeys, 'Resultado do teste:')
    const resultado = result[resultKeys[resultIndex]]

    sistema.fazerTeste(resultado, tipoTeste, idAeronave)
    console.log("Teste registrado")
    sistema.salvarDados()
}

function gerarRelatorio() {
    console.log("\n--- Gerar relatorio de aeronave ---")
    const idAeronave = readlineSync.questionInt('ID da Aeronave para gerar relatorio: ')
    const autor = readlineSync.question('Nome do autor do relatorio: ')
    const relatorio = new Relatorio(autor, new Date(), sistema)
    const relatorioTexto = relatorio.relatorio(idAeronave)

    console.log(relatorioTexto)

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
    const nomeArquivo = `relatorio_aeronave_${idAeronave}_${timestamp}.txt`

    try {
        fs.writeFileSync(nomeArquivo, relatorioTexto, 'utf-8')
        console.log(`\nRelatorio salvo com sucesso no arquivo: ${nomeArquivo}`)
    } catch (error) {
        console.error('\nErro ao salvar o relatorio:', error)
    }
}


function mainMenu() {
    while (true) {
        console.log("\n====== MENU PRINCIPAL ======")
        const escolha = readlineSync.question(
            'Escolha uma opcao:\n' +
            '1. Gerenciar aeronaves\n' +
            '2. Gerenciar pecas\n' +
            '3. Gerenciar funcionarios\n' +
            '4. Gerenciar etapas de Producao\n' +
            '5. Realizar teste\n' +
            '6. Gerar relatorio\n' +
            '0. Sair\n' +
            '> '
        )

        switch (escolha) {
            case '1':
                gerenciarAeronaves()
                break
            case '2':
                gerenciarPecas()
                break
            case '3':
                gerenciarFuncionarios()
                break
            case '4':
                gerenciarEtapas()
                break
            case '5':
                realizarTeste()
                break
            case '6':
                gerarRelatorio()
                break
            case '0':
                console.log("Saindo do sistema...")
                sistema.salvarDados()
                return
            default:
                console.log("Opção inválida")
        }
        readlineSync.keyInPause() 
    }
}

mainMenu()
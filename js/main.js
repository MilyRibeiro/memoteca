// Esse arquivo será responsável pela lógica principal do carregamento da aplicação, ou seja, da manipulação do formulário, da submissão desses dados e do próprio carregamento da página:
import ui from "./ui.js";
import api from "./api.js";

function removerEspacos(string) {
    return string.replaceAll(/\s+/g, '');
};

const regexConteudo = /^[\p{L}\s.,:!?]{10,}$/u;
function validarConteudo(conteudo) {
    return regexConteudo.test(conteudo);
};

const regexAutoria = /^[\p{L}\s]{3,25}$/u;
function validarAutoria(autoria) {
    return regexAutoria.test(autoria);
}

document.addEventListener('DOMContentLoaded', () => {
    ui.renderizarPensamentos();

    const formularioPensamento = document.getElementById('pensamento-form');
    const botaoCancelar = document.getElementById('botao-cancelar');
    const inputBusca = document.getElementById('campo-busca');

    formularioPensamento.addEventListener("submit", manipularSubmissaoForm);
    botaoCancelar.addEventListener("click", manipularCancelamento);
    inputBusca.addEventListener('input', manipularBusca);
});

async function manipularSubmissaoForm(evento) {
    evento.preventDefault();
    const id = document.getElementById('pensamento-id').value;
    const conteudo = document.getElementById('pensamento-conteudo').value;
    const autoria = document.getElementById('pensamento-autoria').value;
    const data = document.getElementById('pensamento-data').value;
    const conteudoSemEspacos = removerEspacos(conteudo);
    const autoriaSemEspacos = removerEspacos(autoria);

    if(!validarConteudo(conteudoSemEspacos)) {
        alert('É permitido digitar apenas letras e espaços com no mínimo 10 caracteres.');
        return;
    };

    if(!validarAutoria(autoriaSemEspacos)) {
        alert('É permitido digitar apenas letras e entre 3 a 15 caracteres sem espaços!');
        return;
    };
    
    if(!validarData(data)) {
        alert('Não é permitido cadastrar datas futuras! Selecione outra data.');
    };

    try {
        if(id) {
            await api.editarPensamento({ id, conteudo, autoria, data });
        } else {
            await api.salvarPensamento({ conteudo, autoria, data });
        };

        ui.renderizarPensamentos();
        
    } catch {
        alert('Erro ao salvar o pensamento.');
    };
};

function manipularCancelamento() {
    ui.limparFormulario();
};

async function manipularBusca() {
    const termoBusca = document.getElementById('campo-busca').value;

    try {
        const pensamentosFiltrados = await api.buscarPensamentoPorTermo(termoBusca);
        ui.renderizarPensamentos(pensamentosFiltrados);
        // console.log(pensamentosFiltrados);
        
    } catch (error) {
        alert('Erro ao realizar a busca.');
    };
};

// O formato específico que queremos é: ano — mês — dia.
function validarData(data) {
    const dataAtual = new Date();  // sem nenhum parâmetro, essa classe retorna a data ATUAL
    const dataInserida = new Date(data);
    return dataInserida <= dataAtual;
};
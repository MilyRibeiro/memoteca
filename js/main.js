// Esse arquivo será responsável pela lógica principal do carregamento da aplicação, ou seja, da manipulação do formulário, da submissão desses dados e do próprio carregamento da página:
import ui from "./ui.js";
import api from "./api.js";

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

// No JavaScript, os meses são representados de 0 a 11. Funciona como no array, em que o índice do primeiro elemento é 0, não 1. Sendo assim, ao lidar com meses, precisamos fazer uma conversão, por ex.: se quisermos o mês de agosto, precisamos passar 7 para que o construtor retorne o mês correto.
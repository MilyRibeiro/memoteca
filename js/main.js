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

    try {
        if(id) {
            await api.editarPensamento({ id, conteudo, autoria });
        } else {
            await api.salvarPensamento({ conteudo, autoria });
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
}
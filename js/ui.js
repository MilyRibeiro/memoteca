// Nesse arquivo, vamos criar uma função para renderizar os pensamentos na tela:
import api from "./api.js";

const ui = {
    async renderizarPensamentos() {
        const listaDePensamentos = document.getElementById('lista-pensamentos');

        try {
            const pensamentos = await api.buscarPensamentos();
            // pensamentos.forEach(pensamento => {
            //     listaDePensamentos.innerHTML += `
            //         <li class="li-pensamento" data-id="${pensamento.id}">
            //             <img src="assets/imagens/aspas-azuis.png" alt="Aspas azuis" class="icone-aspas">
            //             <div class="pensamento-conteudo">${pensamento.conteudo}</div>
            //             <div class="pensamento-autoria">${pensamento.autoria}</div>
            //         </li>
            //     `
            // });
            pensamentos.forEach(ui.adicionarPensamentoNaLista);
        }
        catch {
            alert('Erro ao renderizar os pensamentos');
            throw error;
        };
    },

    async preencherFormulario(pensamentoId) {
        const pensamento = await api.buscarPensamentoPorId(pensamentoId);
        document.getElementById('pensamento-id').value = pensamento.id;
        document.getElementById('pensamento-conteudo').value = pensamento.conteudo;
        document.getElementById('pensamento-autoria').value = pensamento.autoria;
    },

    limparFormulario() {
        document.getElementById('pensamento-form').reset();
    },


    adicionarPensamentoNaLista(pensamento) {
        const listaDePensamentos = document.getElementById('lista-pensamentos');
        const liPensamento = document.createElement('li');
        liPensamento.setAttribute("data-id", pensamento.id);
        liPensamento.classList.add("li-pensamento");

        const iconeAspas = document.createElement('img');
        iconeAspas.src = "assets/imagens/aspas-azuis.png";
        iconeAspas.alt = "Aspas azuis";
        iconeAspas.classList.add("icone-aspas");

        const pensamentoConteudo = document.createElement('div');
        pensamentoConteudo.textContent = pensamento.conteudo;
        pensamentoConteudo.classList.add("pensamento-conteudo");

        const pensamentoAutoria = document.createElement('div');
        pensamentoAutoria.textContent = pensamento.autoria;
        pensamentoAutoria.classList.add("pensamento-autoria");

        const botaoEditar = document.createElement('button');
        botaoEditar.classList.add("botao-editar");
        botaoEditar.onclick = () => ui.preencherFormulario(pensamento.id);
        const iconeEditar = document.createElement('img');
        iconeEditar.src = "assets/imagens/icone-editar.png";
        iconeEditar.alt = "Editar";
        botaoEditar.appendChild(iconeEditar);

        const icones = document.createElement('div');
        icones.classList.add("icones");
        icones.appendChild(botaoEditar);

        liPensamento.appendChild(iconeAspas);
        liPensamento.appendChild(pensamentoConteudo);
        liPensamento.appendChild(pensamentoAutoria);
        liPensamento.appendChild(icones);
        listaDePensamentos.appendChild(liPensamento);
    }
};

export default ui;
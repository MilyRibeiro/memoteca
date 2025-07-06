// Nesse arquivo, vamos criar uma função para renderizar os pensamentos na tela:
import api from "./api.js";

const ui = {
    async renderizarPensamentos(pensamentosFiltrados = null) {
        const listaDePensamentos = document.getElementById('lista-pensamentos');
        const mensagemVazia = document.getElementById('mensagem-vazia');
        listaDePensamentos.innerHTML = '';

        try {
            let pensamentosParaRenderizar;

            if(pensamentosFiltrados) {
                pensamentosParaRenderizar = pensamentosFiltrados;
            } else {
                pensamentosParaRenderizar = await api.buscarPensamentos();
            };

            // const pensamentos = await api.buscarPensamentos();
            if(pensamentosParaRenderizar.length === 0) {
                mensagemVazia.style.display = "block";
            } else {
                mensagemVazia.style.display = "none";
                pensamentosParaRenderizar.forEach(ui.adicionarPensamentoNaLista);
            };
        }
        catch {
            alert('Erro ao renderizar os pensamentos');
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

        const botaoExcluir = document.createElement('button');
        botaoExcluir.classList.add("botao-excluir");
        botaoExcluir.onclick = async () => {
            try {
                await api.excluirPensamento(pensamento.id);
                ui.renderizarPensamentos();

            } catch (error) {
                alert('Erro ao excluir pensamento!');
            };
        };

        const iconeExcluir = document.createElement('img');
        iconeExcluir.src = "assets/imagens/icone-excluir.png";
        iconeExcluir.alt = "Excluir";
        botaoExcluir.appendChild(iconeExcluir);

        const botaoFavorito = document.createElement('button');
        botaoFavorito.classList.add("botao-favorito");
        botaoFavorito.onclick = async () => {
            try {
                await api.atualizarFavorito(pensamento.id, !pensamento.favorito);
                ui.renderizarPensamentos();

            } catch (error) {
                alert('Erro ao atualizar o pensamento.');
            };
        }

        const iconeFavorito = document.createElement('img');
        iconeFavorito.src = pensamento.favorito ? "assets/imagens/icone-favorito.png" : "assets/imagens/icone-favorito_outline.png";
        iconeFavorito.alt = "Ícone de favorito";
        botaoFavorito.appendChild(iconeFavorito);

        const icones = document.createElement('div');
        icones.classList.add("icones");
        icones.appendChild(botaoFavorito);
        icones.appendChild(botaoEditar);
        icones.appendChild(botaoExcluir);

        liPensamento.appendChild(iconeAspas);
        liPensamento.appendChild(pensamentoConteudo);
        liPensamento.appendChild(pensamentoAutoria);
        liPensamento.appendChild(icones);
        listaDePensamentos.appendChild(liPensamento);
    }
};

export default ui;
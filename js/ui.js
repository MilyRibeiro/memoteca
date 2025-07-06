// Nesse arquivo, vamos criar uma função para renderizar os pensamentos na tela:
import api from "./api.js";

const ui = {
     async preencherFormulario(pensamentoId) {
        const pensamento = await api.buscarPensamentoPorId(pensamentoId);
        document.getElementById('pensamento-id').value = pensamento.id;
        document.getElementById('pensamento-conteudo').value = pensamento.conteudo;
        document.getElementById('pensamento-autoria').value = pensamento.autoria;
        document.getElementById('pensamento-data').value = pensamento.data.toISOString().split("T")[0];  // Esse método retornará uma data como um valor de string no formato ISO, o padrão para a representação de datas e horas. Ele pode ser utilizado em conjunto com o UTC. Após os parênteses de toISOString(), também precisaremos fazer uma quebra com o split(), enviando como parâmetro o T entre aspas duplas, e, após os parênteses, acessaremos o primeiro elemento, o [0].
        // Estamos recebendo a data "2024-08-01T00:00:00.000Z" no formato UTC, e precisamos fazer com que o input de data a reconheça. Para isso, utilizamos o toISOString(). Também fizemos um split(), portanto, a quebra acontecerá a partir do T, e será dividida em duas partes: a primeira com a data e a segunda com o horário. Por fim, o array entre colchetes que informamos com o valor zero indica que queremos o primeiro elemento desse array — ou seja, a data.

        document.getElementById('form-container').scrollIntoView();  //O método scrollIntoView ativará o direcionamento para a parte de edição do formulário por meio do clique no ícone.
    },

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

        const pensamentoData = document.createElement('div');
        const opcoes = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            timeZone: 'UTC'
        };

        const dataFormatada = pensamento.data.toLocaleDateString('pt-BR', opcoes);
        pensamentoData.textContent = dataFormatada;
        pensamentoData.classList.add("pensamento-data");

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
        liPensamento.appendChild(pensamentoData);
        liPensamento.appendChild(icones);
        listaDePensamentos.appendChild(liPensamento);
    }
};

export default ui;
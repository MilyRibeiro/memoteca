// Nesse arquivo, vamos criar uma função para renderizar os pensamentos na tela:
import api from "./api.js";

const ui = {
    async renderizarPensamentos() {
        const listaDePensamentos = document.getElementById('lista-pensamentos');

        try {
            const pensamentos = await api.buscarPensamentos();
            pensamentos.forEach(pensamento => {
                listaDePensamentos.innerHTML += `
                    <li class="li-pensamento" data-id="${pensamento.id}">
                        <img src="assets/imagens/aspas-azuis.png" alt="Aspas azuis" class="icone-aspas">
                        <div class="pensamento-conteudo">${pensamento.conteudo}</div>
                        <div class="pensamento-autoria">${pensamento.autoria}</div>
                    </li>
                `
            });
        }
        catch (error) {
            alert('Erro ao renderizar os pensamentos');
            throw error;
        }
    }
};

export default ui;
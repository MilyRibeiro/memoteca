// Arquivo contendo nossas requisições à API fake:
const URL_BASE = "http://localhost:3000";  // É uma boa prática criar uma constante para guardar a URL base.

const api = {
    async buscarPensamentos() {
        try {
            const resposta = await fetch(`${URL_BASE}/pensamentos`);  // por padrão, o fetch usa o método GET
            return await resposta.json();

        } catch {
            alert('Erro ao buscar pensamentos!');
            throw error;
        };
    },

    async salvarPensamento(pensamento) {
        try {
            const resposta = await fetch(`${URL_BASE}/pensamentos`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(pensamento)
            });

            return await resposta.json();

        } catch {
            alert('Erro ao salvar o pensamento!');
            throw error;
        };
    },

    async buscarPensamentoPorId(id) {
        try {
            const resposta = await fetch(`${URL_BASE}/pensamentos/${id}`);   // por padrão, o fetch usa o método GET
            return await resposta.json();

        } catch {
            alert('Erro ao buscar o pensamento!');
            throw error;
        };
    },

    async editarPensamento(pensamento) {
        try {
            const resposta = await fetch(`${URL_BASE}/pensamentos/${pensamento.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(pensamento)
            });

            return await resposta.json();

        } catch {
            alert('Erro ao editar o pensamento!');
            throw error;
        };
    },

    async excluirPensamento(id) {
        try {
            const resposta = await fetch(`${URL_BASE}/pensamentos/${id}`, {
                method: "DELETE"
            });

        } catch {
            alert('Erro ao EXCLUIR o pensamento!');
        };
    }
};

export default api;
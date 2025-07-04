// Arquivo contendo nossas requisições à API fake:

const api = {
    async buscarPensamentos() {
        try {
            const resposta = await fetch('http://localhost:3000/pensamentos');  // por padrão, o fetch usa o método GET
            return await resposta.json();

        } catch {
            alert('Erro ao buscar pensamentos!');
            throw error;
        };
    },

    async salvarPensamento(pensamento) {
        try {
            const resposta = await fetch('http://localhost:3000/pensamentos', {
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
            const resposta = await fetch(`http://localhost:3000/pensamentos/${id}`);  // por padrão, o fetch usa o método GET
            return await resposta.json();

        } catch {
            alert('Erro ao buscar o pensamento!');
            throw error;
        };
    },

    async editarPensamento(pensamento) {
        try {
            const resposta = await fetch(`http://localhost:3000/pensamentos/${pensamento.id}`, {
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
            const resposta = await fetch(`http://localhost:3000/pensamentos/${id}`, {
                method: "DELETE"
            });

        } catch {
            alert('Erro ao EXCLUIR o pensamento!');
        };
    }
};

export default api;
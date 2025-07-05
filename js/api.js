// Arquivo contendo nossas requisições à API fake:
const URL_BASE = "http://localhost:3000";  // É uma boa prática criar uma constante para guardar a URL base.

const api = {
    async buscarPensamentos() {
        try {
            // const resposta = await fetch(`${URL_BASE}/pensamentos`);  // por padrão, o fetch usa o método GET
            // return await resposta.json();

            const resposta = await axios.get(`${URL_BASE}/pensamentos`);  // por padrão, o fetch usa o método GET
            return await resposta.data;

        } catch {
            alert('Erro ao buscar pensamentos!');
            throw error;
        };
    },

    async salvarPensamento(pensamento) {
        try {
            // const resposta = await fetch(`${URL_BASE}/pensamentos`, {
            //     method: "POST",
            //     headers: {
            //         "Content-Type": "application/json"
            //     },
            //     body: JSON.stringify(pensamento)
            // });
            // return await resposta.json();

            const resposta = await axios.post(`${URL_BASE}/pensamentos`, pensamento);
            return await resposta.data;
        } catch {
            alert('Erro ao salvar o pensamento!');
            throw error;
        };
    },

    async buscarPensamentoPorId(id) {
        try {
            // const resposta = await fetch(`${URL_BASE}/pensamentos/${id}`);   // por padrão, o fetch usa o método GET
            // return await resposta.json();

            const resposta = await axios.get(`${URL_BASE}/pensamentos/${id}`);   // por padrão, o fetch usa o método GET
            return await resposta.data;

        } catch {
            alert('Erro ao buscar o pensamento!');
            throw error;
        };
    },

    async editarPensamento(pensamento) {
        try {
            // const resposta = await fetch(`${URL_BASE}/pensamentos/${pensamento.id}`, {
            //     method: "PUT",
            //     headers: {
            //         "Content-Type": "application/json"
            //     },
            //     body: JSON.stringify(pensamento)
            // });

            // return await resposta.json();

            const resposta = await axios.put(`${URL_BASE}/pensamentos/${pensamento.id}`, pensamento);
            return await resposta.data;

        } catch {
            alert('Erro ao editar o pensamento!');
            throw error;
        };
    },

    async excluirPensamento(id) {
        try {
            // const resposta = await fetch(`${URL_BASE}/pensamentos/${id}`, {
            //     method: "DELETE"
            // });

            const resposta = await axios.delete(`${URL_BASE}/pensamentos/${id}`);

        } catch {
            alert('Erro ao EXCLUIR o pensamento!');
        };
    }
};

export default api;
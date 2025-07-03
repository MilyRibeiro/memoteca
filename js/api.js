// Arquivo contendo nossas requisições à API fake:

const api = {
    async buscarPensamentos() {
        try {
            const resposta = await fetch('http://localhost:3000/pensamentos');
            return await resposta.json();
        } catch {
            alert('Erro ao buscar pensamentos!');
            throw error;
        };
    }
};

export default api;
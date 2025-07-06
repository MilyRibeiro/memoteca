// Arquivo contendo nossas requisições à API fake:
const URL_BASE = "http://localhost:3000";  // É uma boa prática criar uma constante para guardar a URL base.

const converterStringParaData = (dataString) => {
    const [ano, mes, dia] = dataString.split('-'); 
    return new Date(Date.UTC(ano, mes - 1, dia));
};

const api = {
    async buscarPensamentos() {
        try {
            const resposta = await axios.get(`${URL_BASE}/pensamentos`);
            // return await resposta.data;
            const pensamentos = await resposta.data;

            return pensamentos.map(pensamento => {
                return {
                    ...pensamento,
                    data: new Date(pensamento.data)
                };
            });

        } catch {
            alert('Erro ao buscar pensamentos!');
            throw error;
        };
    },

    async salvarPensamento(pensamento) {
        try {
            const data = converterStringParaData(pensamento.data);
            const resposta = await axios.post(`${URL_BASE}/pensamentos`, {
                ...pensamento,
                data: data.toISOString()
            }); 

            return await resposta.data;

        } catch {
            alert('Erro ao salvar o pensamento!');
            throw error;
        };
    },

    async buscarPensamentoPorId(id) {
        try {
            const resposta = await axios.get(`${URL_BASE}/pensamentos/${id}`);
            // return await resposta.data;
            const pensamento = await resposta.data;

            return {
                ...pensamento,
                data: new Date(pensamento.data)
            };

        } catch {
            alert('Erro ao buscar o pensamento!');
            throw error;
        };
    },

    async editarPensamento(pensamento) {
        try {
            const resposta = await axios.put(`${URL_BASE}/pensamentos/${pensamento.id}`, pensamento);
            return await resposta.data;

        } catch {
            alert('Erro ao editar o pensamento!');
            throw error;
        };
    },

    async excluirPensamento(id) {
        try {
            const resposta = await axios.delete(`${URL_BASE}/pensamentos/${id}`);

        } catch {
            alert('Erro ao EXCLUIR o pensamento!');
        };
    },

    async buscarPensamentoPorTermo(termo) {
        try {
            const pensamentos = await this.buscarPensamentos();
            const termoEmMinusculas = termo.toLowerCase();
            const pensamentosFiltrados = pensamentos.filter(pensamento => {
                return (pensamento.conteudo.toLowerCase().includes(termoEmMinusculas) || pensamento.autoria.toLowerCase().includes(termoEmMinusculas));
            });

            return pensamentosFiltrados;

        } catch (error) {
            alert('Erro ao filtrar pensamentos.');
            throw error;
        };
    }, 

    async atualizarFavorito(id, favorito) {
        try {
            const resposta = await axios.patch(`${URL_BASE}/pensamentos/${id}`, { favorito });
            return resposta.data;

        } catch (error) {
            alert('Erro ao atualizar o favorito.');
            throw error;
        };
    }
};

export default api;
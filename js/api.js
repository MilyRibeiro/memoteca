// Arquivo contendo nossas requisições à API fake:
const URL_BASE = "http://localhost:3000";  // É uma boa prática criar uma constante para guardar a URL base.

const converterStringParaData = (dataString) => {
    const [ano, mes, dia] = dataString.split('-');  // data no formato"2025-07-05. O split vai fazer uma quebra nessa string, e o hifen ("-") é o caractere no qual o split vai fazer essa quebra, retornando um array contendo os valores quebrados a partir desse hifen, ou seja, o array retornado será = [2024, 7, 5] --> isso se chama desestruturação no JS, que consiste em associar um array a outro. Como resultado, o ano será 2025, o mês será 08 e o dia será 12.
    return new Date(Date.UTC(ano, mes - 1, dia));  // Fizemos a desestruturação do array para obter somente os números de ano, mês e dia para criar uma data no formato UTC, passando esses valores que obtivemos. Dessa forma, transformaremos essa data do formato string para Date. O JavaScript trata os meses de 0 a 11, e não de 1 a 12, conforme temos costume de lidar. Portanto, precisamos fazer um ajuste de colocar o -1 depois do mês.
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
            // const resposta = await axios.post(`${URL_BASE}/pensamentos`, pensamento);
            const resposta = await axios.post(`${URL_BASE}/pensamentos`, {
                ...pensamento,
                data: data.toISOString()
            }); // Com os três pontos, enviaremos as propriedades que já existem no pensamento ao invés de enviá-lo por completo. Esse procedimento se chama spread (espalhamento) no JavaScript.
            // O operador de três pontos é o Spread Operator (operador de espalhamento). Nesse caso, ele adiciona a data às propriedades do pensamento, sobrescrevendo essa data com a que convertemos para o formato Date.

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
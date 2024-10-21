import axios from 'axios';

// Cria uma instância do Axios com configurações padrões
const api = axios.create({
    baseURL: '/api', // O prefixo /api será tratado pelo Vite proxy
});

// Exemplo de requisição GET
export const getUsers = async () => {
    try {
        const response = await api.get('/users'); // Aqui será redirecionado para http://localhost:8080/users pelo proxy
        return response.data; // Retorna os dados da resposta
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        throw error; // Lança o erro para ser tratado onde a função for chamada
    }
};

// Exemplo de requisição POST
export const createUser = async (userData) => {
    try {
        const response = await api.post('/users', userData);
        return response.data;
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
        throw error;
    }
};

import axios from 'axios';

// Cria uma instância do Axios com configurações padrão
const api = axios.create({
    baseURL: '/api', // O prefixo /api será tratado pelo Vite proxy
});

// Interceptor para adicionar o token JWT em cada requisição
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // Obtém o token do localStorage
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; // Adiciona o token no cabeçalho Authorization
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Função para definir o token (após login)
export const setToken = (token) => {
    if (token) {
        localStorage.setItem('token', token);
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        localStorage.removeItem('token');
        delete api.defaults.headers.common['Authorization'];
    }
};

// Função para logout
export const logout = () => {
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
};

// Função de login do usuário
export const loginUser = async (email, password) => {
    try {
        const response = await api.post('/user/login', { email, password });
        setToken(response.data);
        return response.data;
    } catch (error) {
        console.error('Erro ao fazer login:', error.response?.data || error.message);
        throw error;
    }
};

// Função de registro de usuário
export const registerUser = async (userData) => {
    try {
        const response = await api.post('/user/register', userData);
        return response.data;
    } catch (error) {
        console.error('Erro ao registrar usuário:', error.response?.data || error.message);
        throw error;
    }
};

// Funções para gerenciamento de agendamentos

// Requisição GET para buscar eventos de agendamento
export const getEvents = async () => {
    try {
        const response = await api.get('/agendamentos');
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar agendamentos:', error.response?.data || error.message);
        throw error;
    }
};

// Requisição GET para buscar agendamentos por data
export const getAgendamentosPorData = async (data) => {
    try {
        const response = await api.get(`/agendamentos?date=${data}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar agendamentos por data:', error.response?.data || error.message);
        throw error;
    }
};


// Requisição POST para criar um novo agendamento
export const createEvent = async (eventData) => {
    try {
        const response = await api.post('/agendamentos', eventData);
        return response.data;
    } catch (error) {
        console.error('Erro ao criar agendamento:', error.response?.data || error.message);
        throw error;
    }
};

// Requisição PUT para atualizar um agendamento
export const updateEvent = async (eventId, updatedData) => {
    try {
        const response = await api.put(`/agendamentos/${eventId}`, updatedData);
        return response.data;
    } catch (error) {
        console.error('Erro ao atualizar agendamento:', error.response?.data || error.message);
        throw error;
    }
};

// Requisição DELETE para remover um agendamento
export const deleteEvent = async (eventId) => {
    try {
        const response = await api.delete(`/agendamentos/${eventId}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao excluir agendamento:', error.response?.data || error.message);
        throw error;
    }
};

// Função de registro de serviço
export const registerService = async (serviceData) => {
    try {
        const response = await api.post('/servicos', serviceData);
        return response.data;
    } catch (error) {
        console.error('Erro ao cadastrar serviço:', error.response?.data || error.message);
        throw error;
    }
};

// Função para buscar serviços
export const getServices = async () => {
    try {
        const response = await api.get('/servicos');
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar serviços:', error.response?.data || error.message);
        throw error;
    }
};

// Função para deletar um serviço
export const deleteService = async (id) => {
    try {
        const response = await api.delete(`/servicos/${id}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao deletar serviço:', error.response?.data || error.message);
        throw error;
    }
};

// Função para atualizar um serviço
export const updateService = async (serviceId, updatedData) => {
    try {
        const response = await api.put(`/servicos/${serviceId}`, updatedData);
        return response.data;
    } catch (error) {
        console.error('Erro ao atualizar serviço:', error.response?.data || error.message);
        throw error;
    }
};

export default api;

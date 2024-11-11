// src/pages/LoginPage/LoginCompanyPage.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../services/api'; // Import da função de login do API
import '../LoginPage/LoginPage.css';  // Verifique o caminho do CSS e ajuste se necessário

const LoginCompanyPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await loginUser(email, password); // Usando a função de login do usuário
            if (response) {
                navigate('/petshop-dashboard'); // Redireciona para a página inicial após o login bem-sucedido
            }
        } catch (error) {
            console.error('Erro ao fazer login da empresa:', error);
            // Exibir uma mensagem de erro para o usuário se necessário
        }
    };

    return (
        <div className="login-form">
            <h2>Login da Empresa</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Entrar</button> 
            </form>
        </div>
        
    );
};

export default LoginCompanyPage;

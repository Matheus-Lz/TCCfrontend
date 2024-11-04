// src/pages/LoginPage/LoginCompanyPage.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../LoginPage/LoginPage.css';  // Verifique o caminho do CSS e ajuste se necessário

const LoginCompanyPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cnpj, setCnpj] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        // Adicione a lógica de login para empresas aqui
        console.log("Login de empresa:", { email, password, cnpj });
        navigate('/home'); // Redireciona para a página principal após o login bem-sucedido
    };

    return (
        <div className="login-page">
            <h1>Login de Empresa</h1>
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
                <input 
                    type="text" 
                    placeholder="CNPJ" 
                    value={cnpj} 
                    onChange={(e) => setCnpj(e.target.value)} 
                    required 
                />
                <button type="submit">Entrar como Empresa</button>
            </form>
        </div>
    );
};

export default LoginCompanyPage;

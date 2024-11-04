// src/pages/Register/RegisterCompanyPage.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../LoginPage/RegisterPage.css'; // Certifique-se de ajustar o caminho para o CSS, se necessário

const RegisterCompanyPage = () => {
    const [companyName, setCompanyName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cnpj, setCnpj] = useState('');
    const navigate = useNavigate();

    const handleRegisterCompany = (e) => {
        e.preventDefault();
        // Aqui você pode adicionar a lógica para enviar o formulário
        console.log({ companyName, email, password, cnpj });
        navigate('/home');
    };

    return (
        <div className="register-page">
            <h1>Cadastro de Empresa</h1>
            <form className="register-form" onSubmit={handleRegisterCompany}>
                <input 
                    type="text" 
                    placeholder="Nome da Empresa" 
                    value={companyName} 
                    onChange={(e) => setCompanyName(e.target.value)} 
                    required 
                />
                <input 
                    type="text" 
                    placeholder="CNPJ" 
                    value={cnpj} 
                    onChange={(e) => setCnpj(e.target.value)} 
                    required 
                />
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
                
                <button type="submit" className="register-button">Cadastrar Empresa</button>
            </form>
        </div>
    );
};

export default RegisterCompanyPage;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../services/api';
import './RegisterForm.css';

const RegisterForm = () => {
    const [name, setName] = useState('');
    const [cpf, setCpf] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isCompany, setIsCompany] = useState(false);
    const navigate = useNavigate();

    const handleCheckboxChange = (e) => {
        setIsCompany(e.target.checked);
        if (e.target.checked) {
            navigate('/register-company'); // Redireciona para a página de cadastro de empresa
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Crie um objeto com os dados do usuário
        const userData = {
            name,
            cpf,
            email,
            password,
        };

        try {
            // Chama a função registerUser e espera a resposta
            await registerUser(userData);
            // Se o cadastro for bem-sucedido, redireciona para a página de login
            navigate('/login');
        } catch (error) {
            console.error('Erro ao registrar usuário:', error);
            // Aqui você pode adicionar uma mensagem de erro para o usuário, se desejar
        } // Simula um tempo de resposta do backend (ajuste conforme necessário)
    };


    return (
        <form onSubmit={handleSubmit} className="register-form">
            <h2>Informe seus dados para cadastro</h2>
            <input
                type="text"
                placeholder="Nome Completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="CPF"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
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
            <div className="checkbox-container">
                <input
                    type="checkbox"
                    id="company-checkbox"
                    checked={isCompany}
                    onChange={handleCheckboxChange}
                />
                <label htmlFor="company-checkbox">Sou empresa</label>
            </div>
            <button type="submit">Cadastrar</button>
        </form>
    );
};

export default RegisterForm;
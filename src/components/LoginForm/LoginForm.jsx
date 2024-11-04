import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../services/api'; // Certifique-se de que o caminho está correto
import './LoginForm.css';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await loginUser(email, password); // Função de login que valida o usuário e recebe o token
            if (response) {
                navigate('/home'); // Redireciona para a página inicial após login bem-sucedido
            }
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            // Aqui você pode adicionar uma mensagem de erro para o usuário, se desejar
        }
    };

    return (
        <div className="login-form">
            <h2>Login</h2>
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

export default LoginForm;

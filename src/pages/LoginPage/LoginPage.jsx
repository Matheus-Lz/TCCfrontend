import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../../components/LoginForm/LoginForm';
import './LoginPage.css';

const LoginPage = () => {
    const navigate = useNavigate();

    return (
        <div className="login-page">
            <h1>Bem-vindo ao Sistema de Agendamento</h1>
            <div className="login-container">
                <LoginForm />
                <a href="/register" className="register-link">Ainda não tem conta? Cadastre-se</a>
                <p>
                    <button
                        className="link-button"
                        onClick={() => navigate('/login-company')} // Use navigate aqui
                    >
                        Sou empresa
                    </button>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;

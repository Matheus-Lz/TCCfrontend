import React from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';
import './LoginPage.css';

const LoginPage = () => {
    return (
        <div className="login-page">
            <h1>Bem-vindo ao Sistema de Agendamento</h1>
            <div className="login-container">
                <LoginForm />
                <a href="/register" className="register-link">Ainda não tem conta? Cadastre-se</a>
            </div>
        </div>
    );
};

export default LoginPage;

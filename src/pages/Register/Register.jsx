import React, { useState } from 'react';
import RegisterForm from '../../components/RegisterForm/RegisterForm';
import { useNavigate } from 'react-router-dom';
import "../LoginPage/RegisterPage.css";

const Register = () => {
    const [isCompany, setIsCompany] = useState(false);
    const navigate = useNavigate();

    const handleCompanyChange = () => {
        setIsCompany(!isCompany);
        if (!isCompany) {
            navigate('/register-company'); // Redireciona para a página de cadastro de empresa
        }
    };

    return (
        <div className="register-page">
            <h1>Cadastro</h1>
            <RegisterForm />
            
        </div>
    );
};

export default Register;

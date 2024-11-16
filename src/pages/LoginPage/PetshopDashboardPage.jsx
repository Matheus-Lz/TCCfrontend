import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PetshopDashboardPage.css';
import LogoutIcon from '../../Icons/Logout.svg'; // Certifique-se de que o ícone está no caminho correto
import { logout } from '../../services/api'; // Função de logout da API

const PetshopDashboardPage = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        logout(); // Remove o token
        navigate('/'); // Redireciona para a tela inicial
    };

    return (
        <div className="petshop-dashboard">
            <aside className="sidebar">
                <h2>Petshop Dashboard</h2>
                <ul>
                    <li onClick={() => navigate('/petshop/services')}>Cadastrar Serviços</li>
                    <li onClick={() => navigate('/petshop/service-list')}>Consultar Serviços</li>
                    <li onClick={() => navigate('/petshop/appointments')}>Gerenciar Agendamentos</li>
                </ul>
                <div className="logout-container" onClick={handleLogout}>
                    <img src={LogoutIcon} alt="Logout" className="logout-icon" />
                    <span className="logout-text">Sair</span>
                </div>
            </aside>
            <main className="content">
                <h1>Bem-vindo à área de gerenciamento da Petshop!</h1>
                <p>Escolha uma opção no menu para começar.</p>
            </main>
        </div>
    );
};

export default PetshopDashboardPage;

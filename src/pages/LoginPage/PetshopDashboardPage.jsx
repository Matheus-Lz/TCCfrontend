import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PetshopDashboardPage.css';

const PetshopDashboardPage = () => {
    const navigate = useNavigate();

    return (
        <div className="petshop-dashboard">
            <aside className="sidebar">
                <h2>Petshop Dashboard</h2>
                <ul>
                    <li onClick={() => navigate('/petshop/services')}>Cadastrar Serviços</li>
                    <li onClick={() => navigate('/petshop/service-list')}>Consultar Serviços</li>
                    <li onClick={() => navigate('/petshop/appointments')}>Gerenciar Agendamentos</li>
                </ul>
            </aside>
            <main className="content">
                <h1>Bem-vindo à área de gerenciamento da Petshop!</h1>
                <p>Escolha uma opção no menu para começar.</p>
            </main>
        </div>
    );
};

export default PetshopDashboardPage;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';
import SearchIcon from '../../Icons/Search.svg'; // Importação do ícone de busca
import AccountIcon from '../../Icons/Account.svg'; // Importação do ícone de conta

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="homepage">
      {/* Barra Horizontal Superior */}
      <header className="horizontal-bar">
        <div className="horizontal-content">
          {/* Barra de Pesquisa */}
          <div className="search-bar">
            <input type="text" placeholder="Procure por serviços..." />
            <img src={SearchIcon} alt="Buscar" className="search-icon" />
          </div>

          {/* Botão de Login/Cadastro */}
          <div className="auth-button" onClick={() => navigate('/login')}>
            <img src={AccountIcon} alt="Conta" className="account-icon" />
            <div className="auth-text">
              <span className="top-text">Entre</span>
              <span className="bottom-text">ou Cadastre-se</span>
            </div>
          </div>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="home-content">
        {/* Mensagem de Boas-Vindas */}
        <div className="welcome-message">
          <h1>Bem-vindo</h1>
          <p>Aqui você encontra os melhores serviços para seu pet. Explore e agende com facilidade!</p>
        </div>

        {/* Serviços Populares */}
        <div className="services-highlight">
          <h2>Serviços Populares</h2>
          <div className="service-card">Banho e Tosa</div>
          <div className="service-card">Hospedagem</div>
          <div className="service-card">Consulta Veterinária</div>
        </div>

        {/* Botão Agendar Agora */}
        <div className="call-to-action">
          <button className="cta-button" onClick={() => navigate('/agendamento')}>
            Agende Agora!
          </button>
        </div>
      </main>

      {/* Rodapé */}
      <footer className="home-footer">
        <p>&copy; 2024 Sua Petshop. Todos os direitos reservados.</p>
        <div className="social-icons">
          <img src="/Icons/FacebookIcon.svg" alt="Facebook" />
          <img src="/Icons/InstagramIcon.svg" alt="Instagram" />
        </div>
      </footer>
    </div>
  );
};

export default HomePage;

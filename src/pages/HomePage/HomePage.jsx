import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../services/api'; // Certifique-se de que o caminho está correto

const HomePage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Chama a função de logout do api.js
    navigate('/login'); // Redireciona para a página de login
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Bem-vindo à Home Page</h1>
      <button onClick={handleLogout} style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
        Voltar para Login
      </button>
    </div>
  );
};

export default HomePage;

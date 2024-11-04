import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import CalendarComponent from './components/CalendarComponent/CalendarComponent';
import LoginPage from './pages/LoginPage/LoginPage';
import LoginCompanyPage from './pages/LoginPage/LoginCompanyPage'; // Import do Login de Empresa
import Register from './pages/Register/Register';
import RegisterCompanyPage from './pages/Register/RegisterCompanyPage'; // Import do Cadastro de Empresa
import HomePage from './pages/HomePage/HomePage';

import './styles/App.css';

function App() {
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <div className="app-container">
      <Routes>
        {/* Rota pública para Login */}
        <Route path="/login" element={isAuthenticated ? <Navigate to="/home" /> : <LoginPage />} />

        {/* Rota pública para Login de Empresa */}
        <Route path="/login-company" element={isAuthenticated ? <Navigate to="/home" /> : <LoginCompanyPage />} />

        {/* Rota pública para Registro */}
        <Route path="/register" element={isAuthenticated ? <Navigate to="/home" /> : <Register />} />

        {/* Rota pública para Registro de Empresa */}
        <Route path="/register-company" element={isAuthenticated ? <Navigate to="/home" /> : <RegisterCompanyPage />} />

        {/* Rota protegida para a HomePage */}
        <Route path="/home" element={<HomePage />} />

        {/* Redireciona o caminho raiz ("/") para "/home" */}
        <Route path="/" element={<Navigate to="/home" />} />

        {/* Rota protegida para o Calendário (opcional) */}
        <Route
          path="/calendar"
          element={
            isAuthenticated ? (
              <CalendarComponent />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;

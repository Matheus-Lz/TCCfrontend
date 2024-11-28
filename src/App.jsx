import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import CalendarComponent from './components/CalendarComponent/CalendarComponent';
import LoginPage from './pages/LoginPage/LoginPage';
import LoginCompanyPage from './pages/LoginPage/LoginCompanyPage'; // Import do Login de Empresa
import Register from './pages/Register/Register';
import RegisterCompanyPage from './pages/Register/RegisterCompanyPage'; // Import do Cadastro de Empresa
import HomePage from './pages/HomePage/HomePage';
import PetshopDashboardPage from './pages/LoginPage/PetshopDashboardPage';
import RegisterServicePage from './Petshop/RegisterServicePage'; // Caminho atualizado
import ServiceListPage from './Petshop/ServiceListPage'; // Caminho atualizado
import UserServiceListPage from './pages/User/UserServiceListPage';
import './styles/App.css';

// Componente para Rota Protegida
const PrivateRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('token');
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <div className="app-container">
      <Routes>
        {/* Rota pública para Login */}
        <Route path="/login" element={<LoginPage />} />

        {/* Rota pública para Login de Empresa */}
        <Route path="/login-company" element={<LoginCompanyPage />} />

        {/* Rota pública para Registro */}
        <Route path="/register" element={<Register />} />

        {/* Rota pública para Registro de Empresa */}
        <Route path="/register-company" element={<RegisterCompanyPage />} />

        {/* Rota protegida para a HomePage */}
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />

        {/* Redireciona o caminho raiz ("/") para "/home" */}
        <Route path="/" element={<Navigate to="/home" />} />

        {/* Rota protegida para Petshop Dashboard */}
        <Route
          path="/petshop-dashboard"
          element={
            <PrivateRoute>
              <PetshopDashboardPage />
            </PrivateRoute>
          }
        />

        {/* Rota protegida para Cadastro de Serviços */}
        <Route
          path="/petshop/services"
          element={
            <PrivateRoute>
              <RegisterServicePage />
            </PrivateRoute>
          }
        />

        {/* Rota protegida para Listagem de Serviços */}
        <Route
          path="/petshop/service-list"
          element={
            <PrivateRoute>
              <ServiceListPage />
            </PrivateRoute>
          }
        />

        {/* Rota protegida para o Calendário */}
        <Route
          path="/calendar/:serviceId"
          element={
            <PrivateRoute>
              <CalendarComponent />
            </PrivateRoute>
          }
        />

        {/* Rota protegida para Listagem de Serviços dos Usuários */}
        <Route
          path="/user/service-list"
          element={
            <PrivateRoute>
              <UserServiceListPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;

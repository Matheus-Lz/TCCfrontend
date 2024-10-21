import React from 'react';
import CalendarComponent from './components/CalendarComponent';
import './App.css'; // Importa o CSS com ajustes

function App() {
  return (
    <div className="calendar-container">
      <h1>Agendamento de Serviços de Petshop</h1>
      <CalendarComponent />
    </div>
  );
}

export default App;

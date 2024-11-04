import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserComponent.css'; // Caso crie um arquivo CSS para estilizar este componente

const UserComponent = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('/api/users') // Certifique-se de que a rota '/api/users' está configurada corretamente no backend
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar os usuários', error);
      });
  }, []);

  return (
    <div className="user-component">
      <h1>Lista de Usuários</h1>
      <ul>
        {users.map(user => (
          <li key={user.idUser}>{user.name}</li> // Verifique se 'idUser' e 'name' são as chaves corretas
        ))}
      </ul>
    </div>
  );
};

export default UserComponent;

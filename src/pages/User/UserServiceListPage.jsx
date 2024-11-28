import React, { useEffect, useState } from "react";
import { getServices } from "../../services/api"; // Certifique-se que a função está correta
import { useNavigate } from "react-router-dom";
import "./UserServiceListPage.css";

const UserServiceListPage = () => {
  const [services, setServices] = useState([]); // Inicializa como array vazio
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await getServices();
        if (Array.isArray(data)) {
          setServices(data); // Garante que apenas arrays são definidos
        } else {
          console.error("Dados inválidos recebidos da API:", data);
          setServices([]); // Define como array vazio em caso de erro
        }
      } catch (error) {
        console.error("Erro ao buscar serviços:", error);
        setServices([]); // Garante que `services` permanece um array
      }
    };
    fetchServices();
  }, []);

  const handleScheduleClick = (serviceId) => {
    navigate(`/calendar/${serviceId}`); // Redireciona para o calendário com o ID do serviço na URL
  };

  return (
    <div className="user-service-list-page">
      <h1>Serviços Disponíveis</h1>
      <div className="services-container">
        {services.length > 0 ? (
          services.map((service) => (
            <div key={service.idServico} className="service-card">
              <h2>{service.name}</h2>
              <p>
                <strong>Descrição:</strong> {service.description}
              </p>
              <p>
                <strong>Preço:</strong>{" "}
                {typeof service.price === "number"
                  ? service.price.toFixed(2).replace(".", ",")
                  : service.price}
              </p>
              <p>
                <strong>Duração:</strong> {service.timeInMinutes} minutos
              </p>
              <button
                className="schedule-button"
                onClick={() => handleScheduleClick(service.idServico)}
              >
                Agendar
              </button>
            </div>
          ))
        ) : (
          <p>Nenhum serviço disponível no momento.</p>
        )}
      </div>
    </div>
  );
};

export default UserServiceListPage;

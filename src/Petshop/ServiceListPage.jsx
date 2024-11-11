import React, { useEffect, useState } from 'react';
import { getServices } from '../services/api'; // Importa a função para buscar serviços
import './ServiceListPage.css';

const ServiceListPage = () => {
    const [services, setServices] = useState([]);

    useEffect(() => {
        // Busca os serviços ao carregar o componente
        const fetchServices = async () => {
            try {
                const data = await getServices();
                setServices(data);
            } catch (error) {
                console.error("Erro ao buscar serviços:", error);
            }
        };
        fetchServices();
    }, []);

    return (
        <div className="service-list-page">
            <h1>Serviços Cadastrados</h1>
            <div className="services-container">
                {services.map(service => (
                    <div key={service.idServico} className="service-card">
                        <h2>{service.name}</h2>
                        <p><strong>Descrição:</strong> {service.description}</p>
                        <p><strong>Preço:</strong> R$ {service.price.toFixed(2).replace('.', ',')}</p>
                        <p><strong>Duração:</strong> {service.timeInMinutes} minutos</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ServiceListPage;

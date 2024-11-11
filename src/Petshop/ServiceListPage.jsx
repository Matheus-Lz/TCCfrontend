import React, { useEffect, useState } from 'react';
import { getServices, deleteService } from '../services/api'; // Importa a função para buscar e deletar serviços
import './ServiceListPage.css';
import LixeiraIcon from '../Icons/Lixeira.svg'; // Caminho para o ícone de lixeira

const ServiceListPage = () => {
    const [services, setServices] = useState([]);
    const [showConfirm, setShowConfirm] = useState(false);
    const [selectedService, setSelectedService] = useState(null);

    useEffect(() => {
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

    const handleDeleteClick = (service) => {
        setSelectedService(service); // Armazena o serviço a ser deletado
        setShowConfirm(true); // Exibe o modal de confirmação
    };

    const confirmDelete = async () => {
        if (selectedService) {
            try {
                await deleteService(selectedService.idServico);
                setServices(services.filter(service => service.idServico !== selectedService.idServico));
            } catch (error) {
                console.error("Erro ao deletar serviço:", error);
                alert("Erro ao deletar o serviço.");
            }
            setShowConfirm(false);
            setSelectedService(null);
        }
    };

    const cancelDelete = () => {
        setShowConfirm(false);
        setSelectedService(null);
    };

    return (
        <div className="service-list-page">
            <h1>Serviços Cadastrados</h1>
            <div className="services-container">
                {services.map(service => (
                    <div key={service.idServico} className="service-card">
                        <img 
                            src={LixeiraIcon} 
                            alt="Deletar" 
                            className="delete-icon" 
                            onClick={() => handleDeleteClick(service)} 
                        />
                        <h2>{service.name}</h2>
                        <p><strong>Descrição:</strong> {service.description}</p>
                        <p><strong>Preço:</strong> R$ {service.price.toFixed(2).replace('.', ',')}</p>
                        <p><strong>Duração:</strong> {service.timeInMinutes} minutos</p>
                    </div>
                ))}
            </div>

            {/* Modal de Confirmação */}
            {showConfirm && (
                <div className="confirm-modal">
                    <div className="modal-content">
                        <p>Você realmente deseja deletar este serviço?</p>
                        <button onClick={confirmDelete} className="confirm-button">Sim</button>
                        <button onClick={cancelDelete} className="cancel-button">Não</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ServiceListPage;

import React, { useEffect, useState } from 'react';
import { getServices, deleteService, updateService } from '../services/api'; // Importa as funções para buscar, deletar e atualizar serviços
import './ServiceListPage.css';
import LixeiraIcon from '../Icons/Lixeira.svg';
import EditIcon from '../Icons/Edit.svg';

const ServiceListPage = () => {
    const [services, setServices] = useState([]);
    const [showConfirm, setShowConfirm] = useState(false);
    const [selectedService, setSelectedService] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false); // Estado para o modal de edição
    const [editedService, setEditedService] = useState({}); // Estado para armazenar os dados editados

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
        setSelectedService(service);
        setShowConfirm(true);
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

    const handleEditClick = (service) => {
        setEditedService(service);
        setShowEditModal(true);
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditedService((prevService) => ({
            ...prevService,
            [name]: value,
        }));
    };

    const handleEditSave = async () => {
        try {
            await updateService(editedService.idServico, editedService);
            setServices((prevServices) =>
                prevServices.map((service) =>
                    service.idServico === editedService.idServico ? editedService : service
                )
            );
            setShowEditModal(false);
            setEditedService({});
            alert("Serviço atualizado com sucesso!"); // Mostra a mensagem de sucesso
        } catch (error) {
            console.error("Erro ao atualizar serviço:", error);
            alert("Erro ao atualizar o serviço.");
        }
    };

    return (
        <div className="service-list-page">
            <h1>Serviços Cadastrados</h1>
            <div className="services-container">
                {services.map((service) => (
                    <div key={service.idServico} className="service-card">
                        <img 
                            src={LixeiraIcon} 
                            alt="Deletar" 
                            className="delete-icon" 
                            title="Deletar Serviço" // Tooltip para deletar
                            onClick={() => handleDeleteClick(service)} 
                        />
                        <img
                            src={EditIcon}
                            alt="Alterar"
                            className="edit-icon"
                            title="Editar Serviço" // Tooltip para editar
                            onClick={() => handleEditClick(service)}
                        />
                        <h2>{service.name}</h2>
                        <p><strong>Descrição:</strong> {service.description}</p>
                        <p><strong>Preço:</strong> R$ {typeof service.price === 'number' ? service.price.toFixed(2).replace('.', ',') : service.price}</p>
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

            {/* Modal de Edição */}
            {showEditModal && (
                <div className="confirm-modal">
                    <div className="modal-content">
                        <h2>Editar Serviço</h2>
                        <label>
                            Nome:
                            <input
                                type="text"
                                name="name"
                                value={editedService.name || ''}
                                onChange={handleEditChange}
                            />
                        </label>
                        <label>
                            Descrição:
                            <textarea
                                name="description"
                                value={editedService.description || ''}
                                onChange={handleEditChange}
                                maxLength={100} // Limita a 100 caracteres
                                style={{ fontFamily: 'inherit', color: '#333' }} // Estilo para o texto do textarea
                            />
                        </label>
                        <label>
                            Preço:
                            <input
                                type="number" 
                                id="price" 
                                value={editedService.price} 
                                onChange={(e) => setEditedService({ ...editedService, price: e.target.value })}
                                placeholder="R$ 00,00" 
                                style={{ fontFamily: 'inherit', color: '#333' }}
                            />
                        </label>
                        <label>
                            Duração (minutos):
                            <input
                                type="number"
                                name="timeInMinutes"
                                value={editedService.timeInMinutes || ''}
                                onChange={handleEditChange}
                            />
                        </label>
                        <button onClick={handleEditSave} className="confirm-button">Salvar</button>
                        <button onClick={() => setShowEditModal(false)} className="cancel-button">Cancelar</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ServiceListPage;

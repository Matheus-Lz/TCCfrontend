import React, { useState, useEffect } from "react";
import api from "../services/api";
import LixeiraIcon from '../Icons/Lixeira.svg';
import "./AppointmentsPage.css";

const AppointmentsPage = () => {
    const [appointments, setAppointments] = useState([]);
    const [showConfirm, setShowConfirm] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState(null);

    useEffect(() => {
        api
            .get("/api/agendamentos")
            .then((response) => {
                setAppointments(response.data);
            })
            .catch((error) => {
                console.error("Erro ao buscar agendamentos:", error);
            });
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date instanceof Date && !isNaN(date) ? date.toLocaleString() : "Data inválida";
    };

    const handleDeleteClick = (appointment) => {
        setSelectedAppointment(appointment);
        setShowConfirm(true);
    };

    const confirmDelete = async () => {
        if (selectedAppointment && selectedAppointment.idAgendamento) {
            try {
                await api.delete(`/api/agendamentos/${selectedAppointment.idAgendamento}`);
                setAppointments(appointments.filter((a) => a.idAgendamento !== selectedAppointment.idAgendamento));
                alert("Agendamento cancelado com sucesso!");
            } catch (error) {
                console.error("Erro ao cancelar agendamento:", error);
                alert("Ocorreu um erro ao cancelar o agendamento.");
            }
            setShowConfirm(false);
            setSelectedAppointment(null);
        } else {
            console.error("ID do agendamento não encontrado ou inválido");
            alert("Erro: ID do agendamento não encontrado.");
        }
    };

    const cancelDelete = () => {
        setShowConfirm(false);
        setSelectedAppointment(null);
    };

    return (
        <div className="appointments-container">
            <h1>Agendamentos</h1>
            <div className="appointments-list">
                {appointments.length > 0 ? (
                    appointments.map((appointment, index) => (
                        <div className="appointment-card" key={appointment.idAgendamento || index}>
                            <img
                                src={LixeiraIcon}
                                alt="Cancelar"
                                className="delete-icon"
                                title="Cancelar Agendamento"
                                onClick={() => handleDeleteClick(appointment)}
                            />
                            <h3>Agendamento {appointment.idAgendamento}</h3>
                            <p><strong>Nome Serviço:</strong> {appointment.nameServico || "Não especificado"}</p>
                            <p><strong>Data de Início:</strong> {appointment.dataInicio ? formatDate(appointment.dataInicio) : "Data não disponível"}</p>
                            <p><strong>Data de Fim:</strong> {appointment.dataFim ? formatDate(appointment.dataFim) : "Data não disponível"}</p>
                            <p><strong>Descrição:</strong> {appointment.descricao || "Sem descrição"}</p>
                        </div>
                    ))
                ) : (
                    <p>Nenhum agendamento encontrado.</p>
                )}
            </div>

            {/* Modal de Confirmação */}
            {showConfirm && (
                <div className="confirm-modal">
                    <div className="modal-content">
                        <p>Você realmente deseja cancelar este agendamento?</p>
                        <button onClick={confirmDelete} className="confirm-button">Sim</button>
                        <button onClick={cancelDelete} className="cancel-button">Não</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AppointmentsPage;

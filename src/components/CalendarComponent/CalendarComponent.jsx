import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import api from "../../services/api"; // Certifique-se de importar a instância correta
import "./CalendarComponent.css";

const CalendarComponent = () => {
  const { serviceId } = useParams();
  const location = useLocation();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reservedTimes, setReservedTimes] = useState([]);
  const [serviceDetails, setServiceDetails] = useState(null);
  const [formData, setFormData] = useState({
    descricao: "",
    dataInicio: "",
    dataFim: "",
    idServico: serviceId || location.state?.serviceId || "",
  });

  useEffect(() => {
    if (!formData.idServico) {
      alert("Erro: ID do serviço não encontrado!");
    } else {
      // Buscar detalhes do serviço para obter a duração
      api
        .get(`/servicos/${formData.idServico}`)
        .then((response) => {
          setServiceDetails(response.data);
        })
        .catch((error) => {
          console.error("Erro ao buscar detalhes do serviço:", error);
        });
    }
  }, [formData.idServico]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setIsModalOpen(true);

    // Buscar horários reservados para a data selecionada
    api
      .get(`/agendamentos?date=${date.toISOString().split("T")[0]}`)
      .then((response) => {
        console.log(response.data);  // Verifique no console a resposta da API
        setReservedTimes(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar horários reservados:", error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "dataInicio" && serviceDetails?.timeInMinutes) {
      // Calcula automaticamente o horário de término com base na duração do serviço
      const [hours, minutes] = value.split(":").map(Number);
      const startTime = new Date(selectedDate);
      startTime.setHours(hours, minutes);

      const endTime = new Date(startTime);
      endTime.setMinutes(startTime.getMinutes() + serviceDetails.timeInMinutes);

      const formattedEndTime = endTime.toTimeString().split(":").slice(0, 2).join(":");
      setFormData((prev) => ({
        ...prev,
        dataInicio: value,
        dataFim: formattedEndTime,
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAgendamentoSubmit = async () => {
    try {
      await api.post("/agendamentos", {
        ...formData,
        dataInicio: `${selectedDate.toISOString().split("T")[0]}T${formData.dataInicio}`,
        dataFim: `${selectedDate.toISOString().split("T")[0]}T${formData.dataFim}`,
      });
      alert("Agendamento realizado com sucesso!");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Erro ao criar agendamento:", error);
      alert("Erro ao criar agendamento.");
    }
  };

  return (
    <div className="calendar-container">
      <h1 className="calendar-title">Calendário de Agendamentos</h1>
      <Calendar
        onChange={handleDateChange}
        value={selectedDate}
        locale="pt-BR"
        tileClassName={({ date }) => {
          const formattedDate = date.toISOString().split("T")[0];
          return reservedTimes.some(
            (time) => time.dataInicio && time.dataInicio.split("T")[0] === formattedDate
          )
            ? "reserved-date"
            : null;
        }}
      />
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Agendar para {selectedDate.toLocaleDateString()}</h2>
            <form>
              <div>
                <label>Descrição:</label>
                <input
                  type="text"
                  name="descricao"
                  value={formData.descricao}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label>Início:</label>
                <input
                  type="time"
                  name="dataInicio"
                  value={formData.dataInicio}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label>Fim:</label>
                <input
                  type="time"
                  name="dataFim"
                  value={formData.dataFim}
                  readOnly
                />
              </div>
              <button type="button" onClick={handleAgendamentoSubmit}>
                Confirmar Agendamento
              </button>
            </form>
            <h3>Horários Reservados:</h3>
            <ul>
              {reservedTimes.map((time, index) => (
                <li key={index}>
                  {time.dataInicio ? time.dataInicio.split("T")[1] : "Horário não disponível"} - {time.dataFim ? time.dataFim.split("T")[1] : "Horário não disponível"}
                </li>
              ))}
            </ul>
            <button onClick={() => setIsModalOpen(false)}>Fechar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarComponent;

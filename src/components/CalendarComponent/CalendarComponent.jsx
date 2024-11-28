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
    idServico: serviceId || "",
  });

  // Extraindo a data da query string
  const queryParams = new URLSearchParams(location.search);
  const dateFromURL = queryParams.get("date");

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

    if (dateFromURL) {
      const selectedDate = new Date(dateFromURL);
      setSelectedDate(selectedDate);
      fetchReservedTimes(selectedDate);
    }
  }, [formData.idServico, dateFromURL]);

  const fetchReservedTimes = (date) => {
    api
      .get(`/api/agendamentos?date=${date.toISOString().split("T")[0]}`)
      .then((response) => {
        setReservedTimes(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar horários reservados:", error);
      });
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setIsModalOpen(true);

    // Atualizando a URL com a data selecionada
    window.history.pushState(null, "", `/calendar/${serviceId}?date=${date.toISOString().split("T")[0]}`);

    fetchReservedTimes(date);
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
      // Corrigido: Formatação das datas no formato ISO completo (incluindo hora)
      const startDateTime = new Date(selectedDate);
      startDateTime.setHours(...formData.dataInicio.split(":").map(Number));

      const endDateTime = new Date(startDateTime);
      endDateTime.setMinutes(startDateTime.getMinutes() + serviceDetails.timeInMinutes);

      const eventData = {
        ...formData,
        dataInicio: startDateTime.toISOString(), // Garante o formato completo ISO 8601
        dataFim: endDateTime.toISOString(),     // Garante o formato completo ISO 8601
      };

      await api.post("/api/agendamentos", eventData);
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

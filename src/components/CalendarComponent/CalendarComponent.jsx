import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import axios from 'axios';

function CalendarComponent() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get('/api/agendamentos')
      .then(response => {
        const formattedEvents = response.data.map(agendamento => ({
          title: agendamento.nomeServico,
          start: agendamento.dataInicio,
          end: agendamento.dataFim,
        }));
        setEvents(formattedEvents);
      })
      .catch(error => {
        console.error("Erro ao carregar eventos: ", error);
      });
  }, []);

  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      events={events}
    />
  );
}

export default CalendarComponent;

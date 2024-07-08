import React, { useEffect, useState } from 'react';
import axios from 'axios';
import routes from '../routes/routes.js';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

const TicketsList = () => {
  const [tickets, setTickets] = useState([]);  

  useEffect(() => {
    const getTickets = async () => {
      const { tokens } = JSON.parse(localStorage.getItem('user'))
      axios.get(routes.ticketsListPath, {
        headers: {
          Authorization: `Bearer ${tokens.access}`,
        },
      }).then((response) => setTickets(response.data))
        .then(() => setTimeout(getTickets, 10000))
    }

    getTickets()
  }, []);

  if (tickets.length === 0) {
    return 'Тикетов пока нет';
  }
  console.log('tickets', tickets)
  return <>
    <Container>
      <Row><h2 className="text-center mb-4">Тикеты</h2></Row>
      <Row >
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Заголовок</th>
              <th>Пользователь</th>
              <th>Специалист</th>
              <th>Создан</th>
              <th>Закрыт</th>
              <th>Приоритет</th>
              <th>Тип</th>
            </tr>

          </thead>
          <tbody>
          {tickets.map((ticket) => {
            return <tr key={ticket.id}>
                <td>{ticket.id}</td>
                <td>{ticket.title}</td>
                <td>{ticket.author.username}</td>
                <td>{ticket.assigned}</td>
                <td>{ticket.created_at}</td>
                <td>{ticket.closed_at}</td>
                <td>{ticket.priority}</td>
                <td>{ticket.type}</td>
              </tr>
          })}
          </tbody>
        </Table>       
      </Row>
    </Container>
  </>

}

export default TicketsList;
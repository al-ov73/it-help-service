import React, { useEffect, useState } from 'react';
import axios from 'axios';
import routes from '../routes/routes.js';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import useAuth from '../hooks/index.js';
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import config from '../config/config.js';

const OwnerItTicketsList = () => {
  const auth = useAuth();
  const [tickets, setTickets] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const navigate = useNavigate();

  const { tokens } = JSON.parse(localStorage.getItem('user'))
  const decoded = jwtDecode(tokens.access);
  const currentUserId = decoded.user_id;
  
  useEffect(() => {
    axios.get(`${routes.getUsersPath}/${currentUserId}`, {
      headers: {
        Authorization: `Bearer ${tokens.access}`,
      },
    }).then((response) => setCurrentUser(response.data))
    .catch((e) => console.log('error', e))
  }, [])

  useEffect(() => {
    const getTickets = async () => {
      const { tokens } = JSON.parse(localStorage.getItem('user'))
      axios.get(routes.ticketsPath, {
        headers: {
          Authorization: `Bearer ${tokens.access}`,
        },
      }).then((response) => setTickets(response.data))
      .catch((e) => {
        console.log('ticket list error', e);
        if (e.response.statusText === 'Unauthorized') {
          console.log('Unauthorized');
          auth.logOut();
          return navigate('/login');
        }
      })
        // .then(() => setTimeout(getTickets, 10000))
    }
    getTickets()
  }, []);

  if (tickets.length === 0) {
    return 'Тикетов пока нет';
  }

  console.log('tickets', tickets)

  const assignHandler = (ticket) => {
    console.log('ticket before', ticket)
    ticket.author = ticket.author.id;
    ticket.assigned = currentUserId;
    console.log('ticket after', ticket)
    axios.put(`${routes.ticketsPath}/${ticket.id}/`, ticket, {
      headers: {
        Authorization: `Bearer ${tokens.access}`,
      }
    })
  }

  return <>
      <Container>
      <Row><h2 className="text-center mb-4">Мои тикеты</h2></Row>
      <Row >
        <Table striped bordered hover className="text-center">
          <thead>
            <tr>
              <th>ID</th>
              <th>Заголовок</th>
              <th>Описание</th>
              <th>Пользователь</th>
              <th>Создан</th>
              <th>Закрыт</th>
              <th>Приоритет</th>
              <th>Тип</th>
            </tr>
          </thead>
          <tbody>
          {tickets
            .filter((ticket) => ticket.assigned && ticket.assigned.username === currentUser.username)
            .map((ticket) => {
              const closeButton = config.IT_ROLES.includes(currentUser.role) && !ticket.assigned ? 
              <button onClick={() => assignHandler(ticket)}>Закрыть</button> : 
              ''
              return <tr key={ticket.id}>
                      <td>{ticket.id}</td>
                      <td>{ticket.title}</td>
                      <td>{ticket.description}</td>
                      <td>{ticket.author.username}</td>
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

export default OwnerItTicketsList;
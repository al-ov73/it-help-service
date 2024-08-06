import React, { useEffect, useState } from 'react';
import axios from 'axios';
import routes from '../routes/routes.js';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { jwtDecode } from "jwt-decode";
import { useSelector } from 'react-redux';


const OwnerItTicketsList = () => {
  const [currentUser, setCurrentUser] = useState({});

  const { tokens } = JSON.parse(localStorage.getItem('user'))
  const decoded = jwtDecode(tokens.access);
  const currentUserId = decoded.user_id;

  const tickets = useSelector((state) => state.tickets.tickets);

  useEffect(() => {
    axios.get(`${routes.getUsersPath}/${currentUserId}`, {
      headers: {
        Authorization: `Bearer ${tokens.access}`,
      },
    }).then((response) => setCurrentUser(response.data))
    .catch((e) => console.log('error', e))
  }, [])

  if (tickets.length === 0) {
    return 'Тикетов пока нет';
  }

  // const assignHandler = (ticket) => {
  //   console.log('ticket before', ticket)
  //   ticket.author = ticket.author.id;
  //   ticket.assigned = currentUserId;
  //   console.log('ticket after', ticket)
  //   axios.put(`${routes.ticketsPath}/${ticket.id}/`, ticket, {
  //     headers: {
  //       Authorization: `Bearer ${tokens.access}`,
  //     }
  //   })
  // }

  return <>
    {<Container>
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
    </Container>}
  </>

}

export default OwnerItTicketsList;
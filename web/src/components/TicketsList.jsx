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
import TicketModal from './TicketModal.jsx';
import OwnerItTicketsList from './OwnerItTicketsList.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { setTickets, updateTicket } from '../slices/ticketsSlice.js';
import { getTicketsFromServer } from '../utils/utils.js';
import Spinner from "react-bootstrap/Spinner"

const TicketsList = () => {
  const dispatch = useDispatch();
  const auth = useAuth();
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showTicket, setShowTicket] = useState({});
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

  const isUserIt = config.IT_ROLES.includes(currentUser.role)
  
  const tickets = useSelector((state) => state.tickets.tickets);

  useEffect(() => {
    getTicketsFromServer()
      .then((tickets) => dispatch(setTickets(tickets)))
      .then(() => setLoading(false))
      .catch((e) => {
        console.log('ticket list error', e);
        if (e.response.statusText === 'Unauthorized') {
          console.log('Unauthorized');
          auth.logOut();
          return navigate('/login');
        }
      })
  }, []);

  if (tickets.length === 0 && loading === false) {
    return 'Тикетов пока нет';
  }

  const assignHandler = (ticket) => {
    const updatedTicket = {...ticket}
    updatedTicket.author = ticket.author.id;
    updatedTicket.assigned = currentUserId;
    axios.put(`${routes.ticketsPath}/${updatedTicket.id}/`, updatedTicket, {
      headers: {
        Authorization: `Bearer ${tokens.access}`,
      }
    })
    .then(() => getTicketsFromServer())
    .then((tickets) => dispatch(setTickets(tickets)))
    .catch((e) => {
      console.log('error', e);
      if (e.response.statusText === 'Unauthorized') {
        console.log('Unauthorized');
        auth.logOut();
        return navigate('/login');
      }
    })
  }

  const showModalHandler = (ticket) => {
    setShowTicket(ticket)
    setShowModal(true);
  }

  return <>
    {isUserIt && <OwnerItTicketsList/>}
    {loading ? <div className="text-center py-5">
                  <Spinner animation="border" />
              </div>  : 
      <Container>
      <Row><h2 className="text-center mb-4">Тикеты</h2></Row>
      <Row >
        <Table striped bordered hover className="text-center">
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
              <th></th>
            </tr>
          </thead>
          <tbody>
          {tickets.map((ticket) => {
            const takeButton = config.IT_ROLES.includes(currentUser.role) && !ticket.assigned ? 
                              <button onClick={() => assignHandler(ticket)}>Забираю</button> : 
                              ''
            return <tr key={ticket.id}>
                <td>{ticket.id}</td>
                <td><button onClick={() => showModalHandler(ticket)}>{ticket.title}</button></td>
                <td>{ticket.author.username}</td>
                <td>{ticket.assigned ? ticket.assigned.username : '-'}</td>
                <td>{ticket.created_at}</td>
                <td>{ticket.closed_at}</td>
                <td>{ticket.priority}</td>
                <td>{ticket.type}</td>
                <td>{takeButton}</td>
              </tr>
          })}
          </tbody>
        </Table>       
      </Row>
    </Container>}
    {showModal && <TicketModal ticket={showTicket} show={showModal} onHide={() => setShowModal(false)}/>}
  </>

}

export default TicketsList;
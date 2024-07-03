import React, { useEffect, useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import IndexNavbar from "./Navbar.jsx";
import axios from 'axios';
import routes from '../routes/routes.js';
import TicketCreateForm from './TicketCreateForm.jsx';
import { jwtDecode } from "jwt-decode";

const IndexPage = () => {
  const [users, setUsers] = useState([]);
  
  const { tokens } = JSON.parse(localStorage.getItem('user'))
  const decoded = jwtDecode(tokens.access);
  const currentUserId = decoded.user_id || '';
  const currentUser = users.find((user) => user.id === currentUserId);
  const username = currentUser ? currentUser.username : '';
  useEffect(() => {
    axios.get(routes.getUsersPath, {
      headers: {
        Authorization: `Bearer ${tokens.access}`,
      },
    }).then((response) => setUsers(response.data))
  }, []);
  return <>
    <IndexNavbar username={username}/>
    {users &&
    <>
    Зарегистрированные юзеры:
    <ListGroup>
    {users.map((user) => {
      return <ListGroup.Item key={user.id}>{user.username}</ListGroup.Item>
    })}
    </ListGroup>
    <TicketCreateForm user={currentUser}/>
    </>
    }
  </>

}

export default IndexPage;
import React, { useEffect, useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import IndexNavbar from "./Navbar.jsx";
import axios from 'axios';
import routes from '../routes/routes.js';

const IndexPage = () => {
  const [users, setUsers] = useState([]);

  const { username, tokens } = JSON.parse(localStorage.getItem('user'))
  useEffect(() => {
    axios.get(routes.getUsersPath(), {
      headers: {
        Authorization: `Bearer ${tokens.access}`,
      },
    }).then((response) => setUsers(response.data))
  }, []);
  console.log('users', users)
  return <>
    <IndexNavbar username={username}/>
    {users &&
    <>
    Зарегистрированные юзеры:
    {users.map((user) => {
      return <>
        <ListGroup>
          <ListGroup.Item key={user.id}>{user.username}</ListGroup.Item>
        </ListGroup>
      </>
    })}
    </>
    }
  </>

}

export default IndexPage;
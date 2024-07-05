import React, { useEffect, useState } from 'react';
import axios from 'axios';
import routes from '../routes/routes.js';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  
  const { tokens } = JSON.parse(localStorage.getItem('user'))

  useEffect(() => {
    axios.get(routes.getUsersPath, {
      headers: {
        Authorization: `Bearer ${tokens.access}`,
      },
    }).then((response) => setUsers(response.data))
  }, []);

  return <>
    <Container>
      <Row>Зарегистрированные юзеры:</Row>
      <Row className="d-inline-flex">
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
          {users.map((user) => {
            return <>
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.role}</td>
              </tr>
            </>
          })}
          </tbody>
        </Table>       
      </Row>
    </Container>
  </>

}

export default UsersList;
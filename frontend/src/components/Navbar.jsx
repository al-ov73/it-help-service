import React from 'react';
import useAuth from '../hooks';
import { useNavigate } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

const IndexNavbar = ({ username }) => {
  const auth = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    auth.logOut();
    return navigate('/login');
  }
  return <>
  
    <Navbar className="bg-body-tertiary justify-content-end">
    { username ? 
      <>
        <Navbar.Text>Вы вошли как { username }</Navbar.Text>
        <Button variant="outline-secondary" onClick={handleLogout}>Logout</Button> 
      </> :
        <Navbar.Text>'Вы не вошли в систему'</Navbar.Text> } 
    </Navbar>


  </>
}

export default IndexNavbar;
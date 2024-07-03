import React from 'react';
import useAuth from '../hooks';
import { useNavigate } from 'react-router-dom';

const IndexNavbar = ({ username }) => {
  const auth = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    auth.logOut();
    return navigate('/login');
  }
  return <>
  { username ? 
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      Вы вошли как { username }
      <button type="button" className="btn btn-secondary" onClick={handleLogout}>Logout</button>
    </nav> :
    'Вы не вошли в систему'
  } 
  </>
}

export default IndexNavbar;
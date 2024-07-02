import React from 'react';
import useAuth from '../hooks';
import { useNavigate } from 'react-router-dom';

const IndexNavbar = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    auth.logOut();
    return navigate('/login');
  }
  return <>
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <button type="button" className="btn btn-secondary" onClick={handleLogout}>Logout</button>
    </div>
  </div>
</nav>
  </>
}

export default IndexNavbar;
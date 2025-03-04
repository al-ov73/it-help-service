import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import TicketsList from './TicketsList.jsx';
import { jwtDecode } from "jwt-decode";
import axios from 'axios';
import Spinner from "react-bootstrap/Spinner"

import routes from '../routes/routes.js';
import config from '../config/config.js';

import IndexNavbar from "./Navbar.jsx";
import TicketCreateForm from './TicketCreateForm.jsx';

import 'react-toastify/dist/ReactToastify.css';


const IndexPage = () => {
  const [currentUser, setCurrentUser] = useState({});
  const [loading, setLoading] = useState(true);

  const { tokens } = JSON.parse(localStorage.getItem('user'))
  const decoded = jwtDecode(tokens.access);
  const currentUserId = decoded.user_id;
  
  useEffect(() => {
    axios.get(`${routes.getUsersPath}/${currentUserId}`, {
      headers: {
        Authorization: `Bearer ${tokens.access}`,
      },
    }).then((response) => setCurrentUser(response.data))
    .then(() => setLoading(false))
    .catch((e) => {
      setLoading(false)
      console.log('error', e)
    })
  }, [])

  const isUserIt = config.IT_ROLES.includes(currentUser.role)

  return <>
    {loading ?
        <div className="text-center py-5">
            <Spinner animation="border" />
        </div> 
    : <>
    <ToastContainer/>
    <IndexNavbar/>
    {!isUserIt && <TicketCreateForm/>}
    <TicketsList/>
    </>}
  </>
}

export default IndexPage;
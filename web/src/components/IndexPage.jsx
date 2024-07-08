import React from 'react';
import IndexNavbar from "./Navbar.jsx";
import TicketCreateForm from './TicketCreateForm.jsx';
import { ToastContainer } from 'react-toastify';
import TicketsList from './TicketsList.jsx';

import 'react-toastify/dist/ReactToastify.css';

const IndexPage = () => {

  return <>
    <ToastContainer/>
    <IndexNavbar/>
    <TicketCreateForm/>
    <TicketsList/>
  </>

}

export default IndexPage;
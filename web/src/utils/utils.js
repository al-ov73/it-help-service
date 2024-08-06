import axios from 'axios';
import routes from '../routes/routes.js';


export const getTicketsFromServer = async () => {
  const { tokens } = JSON.parse(localStorage.getItem('user'))
  return axios.get(routes.ticketsPath, {
      headers: {
      Authorization: `Bearer ${tokens.access}`,
      },
  }).then((response) => response.data)
}
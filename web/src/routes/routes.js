const apiPath = process.env.REACT_APP_API_URL;


export default {
  loginPath: `${apiPath}login/`,
  signupPath: `${apiPath}signup/`,
  getUsersPath: `${apiPath}users/`,
  ticketsListPath: `${apiPath}tickets/`,
  ticketCreatePath: `${apiPath}newticket/`,
  ticketPath: `${apiPath}ticket/`,
};

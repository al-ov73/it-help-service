const apiPath = '/api/v1';

export default {
  loginPath: () => [apiPath, 'login/'].join('/'),
  signupPath: () => [apiPath, 'signup/'].join('/'),
  getUsersPath: () => [apiPath, 'users/'].join('/'),
};
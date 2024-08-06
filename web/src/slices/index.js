import { configureStore } from '@reduxjs/toolkit';
import ticketsReducer from './ticketsSlice.js';

export default configureStore({
  reducer: {
    tickets: ticketsReducer,
  },
});

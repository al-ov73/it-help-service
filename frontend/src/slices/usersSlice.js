import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  username: null,
  token: null,
}

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {

    setCredentials: (state, {payload}) => {
      // state.username = username;
      state.token = payload;
    },

    removeCredentials: (state) => {
      // state.username = null;
      state.token = null;
    },
  },
})

export const { setCredentials, removeCredentials } = slice.actions

export default slice.reducer

export const selectCurrentUser = (state) => state.auth.username

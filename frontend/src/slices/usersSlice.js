import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  username: null,
  token: null,
}

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {

    setCredentials: (state, {payload: { username, token }}) => {
      console
      state.username = username;
      state.token = token;
    },

    removeCredentials: (state) => {
      state.username = null;
      state.token = null;
    },
  },
})

export const { setCredentials, removeCredentials } = slice.actions

export default slice.reducer

export const selectCurrentUser = (state) => state.auth.username

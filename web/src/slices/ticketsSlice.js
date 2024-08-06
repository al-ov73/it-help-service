import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  tickets: [],
}

const slice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    setTickets: (state, {payload}) => {
      state.tickets = payload;
    },
  },
})

export const { setTickets } = slice.actions

export default slice.reducer

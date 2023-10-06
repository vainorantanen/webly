import feedbidsService from '../services/feedbids'

import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'feedBids',
  initialState: [],
  reducers: {
    set(state, { payload }) {
      return payload
    },
  },
})

const { set } = slice.actions

export const initializeFeedBids = () => {
  return async dispatch => {
    const data = await feedbidsService.getAll()
    dispatch(set(data))
  }
}

export default slice.reducer
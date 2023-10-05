import portalbidsService from '../services/portalbids'

import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'portalBids',
  initialState: [],
  reducers: {
    set(state, { payload }) {
      return payload
    },
  },
})

const { set } = slice.actions

export const initializePortalBids = () => {
  return async dispatch => {
    const data = await portalbidsService.getAll()
    dispatch(set(data))
  }
}

export default slice.reducer
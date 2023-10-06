import portalbidsService from '../services/portalbids'

import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'portalBids',
  initialState: [],
  reducers: {
    set(state, { payload }) {
      return payload
    },
    add(state, { payload }) {
      return state.concat(payload)
    },
    remove(state, { payload }) {
      return state.filter(s => s.id !== payload)
    },
    alter(state, { payload }) {
      return state.map(s => s.id !== payload.id ? s : payload)
    },
  },
})

const { set, add, remove, alter } = slice.actions

export const initializePortalBids = () => {
  return async dispatch => {
    const data = await portalbidsService.getAll()
    dispatch(set(data))
  }
}

export const addPortalBid = (object) => {
  return async dispatch => {
    const data = await portalbidsService.create(object)
    dispatch(add(data))
  }
}

export const removePortalBid = (bidId) => {
  return async dispatch => {
    await portalbidsService.remove(bidId)
    dispatch(remove(bidId))
  }
}

export const updatePortalBid = (objectId) => {
  return async dispatch => {
    const data = await portalbidsService.update(objectId)
    dispatch(alter(data))
  }
}

export default slice.reducer
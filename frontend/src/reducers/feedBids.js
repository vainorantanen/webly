import feedbidsService from '../services/feedbids'

import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'feedBids',
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

export const initializeFeedBids = () => {
  return async dispatch => {
    const data = await feedbidsService.getAll()
    dispatch(set(data))
  }
}

export const addFeedBid = (object) => {
  return async dispatch => {
    const data = await feedbidsService.create(object)
    dispatch(add(data))
  }
}

export const updateFeedBid = (object) => {
  return async dispatch => {
    const data = await feedbidsService.update(object)
    dispatch(alter(data))
  }
}

export const commentFeedBid = (id, comment) => {
  return async dispatch => {
    const data = await feedbidsService.comment(id, comment)
    dispatch(alter(data))
  }
}

export const removeFeedBid = (object) => {
  return async dispatch => {
    await feedbidsService.remove(object.id)
    dispatch(remove(object.id))
  }
}

export default slice.reducer
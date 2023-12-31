import devsPostsService from '../services/devfeedposts'

import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'devsPosts',
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

export const initializeDevsPosts = () => {
  return async dispatch => {
    const data = await devsPostsService.getAll()
    dispatch(set(data))
  }
}

export const addDevPost = (object) => {
  return async dispatch => {
    try {
      const data = await devsPostsService.create(object)
      dispatch(add(data))
    } catch (error) {
      // Handle the error and return it for displaying on the frontend.
      return { error: 'error adding data' };
    }
  }
}

export const updateDevPost= (object) => {
  return async dispatch => {
    try {
    const data = await devsPostsService.update(object)
    dispatch(alter(data))
    } catch(error) {
      // Handle the error and return it for displaying on the frontend.
      return { error: 'error adding data' };
    }
  }
}

export const removeDevPost = (object) => {
  return async dispatch => {
    try {
      await devsPostsService.remove(object.id)
      dispatch(remove(object.id))
    } catch(error) {
      return { error: 'error adding data' };
    }
  }
}

export default slice.reducer
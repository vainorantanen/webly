import { createSlice } from '@reduxjs/toolkit'
import portalpostsService from '../services/portalposts'

const slice = createSlice({
  name: 'portalPosts',
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

export const initializePortalposts = () => {
  return async dispatch => {
    const data = await portalpostsService.getAll()
    dispatch(set(data))
  }
}

export const addPortalpost = (object) => {
  return async dispatch => {
    try {
      const data = await portalpostsService.create(object)
      dispatch(add(data))
    } catch (error) {
      return { error: error };
    }
  }
}

export const updatePortalpost= (object) => {
  return async dispatch => {
    try {
      const data = await portalpostsService.update(object)
      dispatch(alter(data))
    } catch (error) {
      return { error: error };
    }
  }
}

export const removePortalpost = (object) => {
  return async dispatch => {
    try {
      await portalpostsService.remove(object.id)
      dispatch(remove(object.id))
    } catch (error) {
      return { error: error };
    }
  }
}

export default slice.reducer
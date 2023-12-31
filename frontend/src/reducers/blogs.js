import blogsService from '../services/blogs'

import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'blogs',
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

export const initializeBlogs = () => {
  return async dispatch => {
    const data = await blogsService.getAll()
    dispatch(set(data))
  }
}

export const addBlog = (object) => {
  return async dispatch => {
    try {
      const data = await blogsService.create(object)
      dispatch(add(data))
    } catch (error) {
      // Handle the error and return it for displaying on the frontend.
      return { error: 'error adding data' };
    }
  }
}

export const updateBlog= (object) => {
  return async dispatch => {
    try {
      const data = await blogsService.update(object)
      dispatch(alter(data))
    } catch (error) {
      return { error: 'error adding data' };
    }
  }
}


export const removeBlog = (object) => {
  return async dispatch => {
    try {
      await blogsService.remove(object.id)
      dispatch(remove(object.id))
    } catch (error) {
      return { error: 'error adding data' };
    }
  }
}

export default slice.reducer
import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import storageService from '../services/storage'
import usersService from '../services/users'
import { initializePortalposts } from './portalPosts'
import { initializePortalBids } from './portalBids'
import { initializeCustomerInfos } from './customerinfo'
import { initializeUsers } from './users'

const initialState = null

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    set(state, action) {
      return action.payload
    },
    clear() {
      return initialState
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

export const { set, clear, add, remove, alter } = slice.actions

export const loginUser = (credentials) => {
  return async dispatch => {
    try {
      const user = await loginService.login(credentials)
      storageService.saveUser(user)
      dispatch(set(user))
      await dispatch(initializePortalposts())
      await dispatch(initializePortalBids())
      await dispatch(initializeCustomerInfos())
      await dispatch(initializeUsers())
    } catch (e) {
      return { error: e };
    }
  }
}

export const initUser = () => {
  return async dispatch => {
    const user = storageService.loadUser()
    dispatch(set(user))
  }
}

export const updateUser= (object) => {
  return async dispatch => {
    try {
      const user = await usersService.update(object)
      dispatch(set(user))
    } catch (error) {
      return { error: error };
    }
  }
}

export const clearUser = () => {
  return async dispatch => {
    storageService.removeUser()
    dispatch(clear())
  }
}


export default slice.reducer
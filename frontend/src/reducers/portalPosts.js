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
    const data = await portalpostsService.create(object)
    dispatch(add(data))
  }
}

export const updatePortalpost= (object) => {
  return async dispatch => {
    const data = await portalpostsService.update(object)
    dispatch(alter(data))
  }
}

export const commentPortalpost = (id, comment) => {
  return async dispatch => {
    const data = await portalpostsService.comment(id, comment)
    dispatch(alter(data))
  }
}

export const makeOffer = (id, content) => {
  return async dispatch => {
    const data = await portalpostsService.makeoffer(id, content)
    dispatch(alter(data))
  }
}

export const modifyBidApprovedState = (offerId, targetId) => {
  return async dispatch => {
    const data = await portalpostsService.modifyAccept(targetId, offerId)
    dispatch(alter(data))
  }
}

export const removBidFromPortalpost = (offerId, targetId) => {
  return async dispatch => {
    const data = await portalpostsService.removeOffer(targetId, offerId)
    dispatch(alter(data))
  }
}

export const removePortalpost = (object) => {
  return async dispatch => {
    await portalpostsService.remove(object.id)
    dispatch(remove(object.id))
  }
}

export default slice.reducer
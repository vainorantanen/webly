import feedPostService from '../services/feedposts'

import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'feedPosts',
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

export const initializeFeedPosts = () => {
  return async dispatch => {
    const data = await feedPostService.getAll()
    dispatch(set(data))
  }
}

export const addFeedPost = (object) => {
  return async dispatch => {
    try {
      const data = await feedPostService.create(object);
      dispatch(add(data));
    } catch (error) {
      // Handle the error and return it for displaying on the frontend.
      return { error: 'error adding data' };
    }
  }
}

export const updateFeedPost= (object) => {
  return async dispatch => {
    try {
      const data = await feedPostService.update(object)
      dispatch(alter(data))
    } catch (error) {
      return { error: 'error adding data' };
    }
  }
}

export const makeOffer = (id, content) => {
  return async dispatch => {
    try {
      const data = await feedPostService.makeoffer(id, content)
      dispatch(alter(data))
    } catch (error) {
      return { error: error };
    }
  }
}

export const modifyBidApprovedState = (offerId, targetId) => {
  return async dispatch => {
    try {
      const data = await feedPostService.modifyAccept(targetId, offerId)
      dispatch(alter(data))
    } catch (error) {
      return { error: error };
    }
  }
}

export const removBidFromFeedPost = (offerId, targetId) => {
  return async dispatch => {
    try {
      const data = await feedPostService.removeOffer(targetId, offerId)
      dispatch(alter(data))
    } catch (error) {
      return { error: 'error adding data' };
    }
  }
}

export const removeFeedPost = (object) => {
  return async dispatch => {
    try {
      await feedPostService.remove(object.id)
      dispatch(remove(object.id))
    } catch (error) {
      return { error: error };
    }
  }
}

export default slice.reducer
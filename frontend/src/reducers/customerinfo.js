import { createSlice } from '@reduxjs/toolkit'
import customerinfoService from '../services/customerinfo'

const slice = createSlice({
  name: 'customerInfos',
  initialState: [],
  reducers: {
    set(state, { payload }) {
      return payload
    },
    add(state, { payload }) {
      return state.concat(payload)
    },
  },
})

const { set, add,} = slice.actions

export const initializeCustomerInfos = () => {
  return async dispatch => {
    const data = await customerinfoService.getAll()
    dispatch(set(data))
  }
}

export const addCustomerInfo = (object) => {
  return async dispatch => {
    try {
      const data = await customerinfoService.create(object)
      dispatch(add(data))
    } catch (error) {
      // Handle the error and return it for displaying on the frontend.
      return { error: 'error adding data' };
    }
  }
}


export default slice.reducer
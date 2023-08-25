import { createSlice } from "@reduxjs/toolkit"
import dayjs from "dayjs"

const initialState = {
  description: '',
  question1: '',
  question2: 'Kuluttajat',
  question2Other: '',
  question3: 'Ei rajoittavia tekijöitä',
  question3Other: '',
  question4: 'Ei tarvetta',
  question5: '',
  isOpen: true,
  minPrice: '',
  maxPrice: ''
}

const slice = createSlice({
  name: 'formData',
  initialState,
  reducers: {
    set(state, action) {
      return action.payload
    },
    update(state, action) {
      const updatedFields = action.payload
      return {
        ...state,
        ...updatedFields
      }
    }
  },
})

 export const { set, update } = slice.actions

 export default slice.reducer
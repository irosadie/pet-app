import { createSlice } from '@reduxjs/toolkit'

let isLoading = false;

export const loadingSlice = createSlice({
  name: 'loading',
  initialState: isLoading,
  reducers: {
    starLoading: (state) => {
      return state = true
    },
    endLoading: (state) => {
      return state = false
    }
  }
})

export const { starLoading, endLoading } = loadingSlice.actions
export default loadingSlice.reducer
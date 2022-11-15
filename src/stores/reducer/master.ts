import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

type MasterProps = {
  id: number,
  name: string
}

export const masterSlice = createSlice({
  name: 'master',
  initialState: {} as Partial<MasterProps>,
  reducers: {
    storeMaster: (state, action: PayloadAction<MasterProps>) => {
      return state = {...state, ...action.payload}
    },
    resetMaster: (state) => {
      return state = {}
    }
  }
})

export const { storeMaster, resetMaster } = masterSlice.actions
export default masterSlice.reducer
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

type ErrorHandlerProps = {
  type: 'ABBORTED' | 'SERVER-ERROR' | 'NO-CONNECTION'
  message: string
}

const errorHandler = createSlice({
  name: 'error_handler',
  initialState: {} as Partial<ErrorHandlerProps>,
  reducers: {
    storeErrorHandler: (state, action: PayloadAction<Partial<ErrorHandlerProps>>) => {
      return state = {...state, ...action.payload}
    },
    unstoreErrorHandler: (state) => {
      return state = {}
    }
  }
})
export const { storeErrorHandler, unstoreErrorHandler } = errorHandler.actions
export default errorHandler.reducer
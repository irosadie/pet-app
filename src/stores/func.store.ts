import { configureStore } from '@reduxjs/toolkit'
import {masterReducer, errorHandlerReducer, loadingReducer} from './reducer'

const store = configureStore({
  reducer: {
    master: masterReducer,
    loading: loadingReducer,
    errorHandler: errorHandlerReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
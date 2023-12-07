import { configureStore } from '@reduxjs/toolkit'
import authSlice from '@lib/slice/authSlice';


const store = configureStore({
  reducer: {
    auth: authSlice
  }
})

export default store;
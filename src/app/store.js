import { configureStore } from '@reduxjs/toolkit'
import formValidationReducer from "../feature/formValidation/formValidationSlice.js"

export const store = configureStore({
  reducer: {
    formValidation: formValidationReducer,
  },
})
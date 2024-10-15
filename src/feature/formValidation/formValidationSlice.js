import { createSlice } from "@reduxjs/toolkit";
import { createUserDataApiSlice,uniqUserDataApiSlice } from "./formValidationAPISlice.js";


const formValidationslice = createSlice({
  name: "formValidationslice",
  initialState: {
    user: [],
    uniqUserData: null,
    message: null,
    error: null,
    loader: false,
  },
  reducers: {
    setEmtyMessage: (state) => {
      state.message = null;
      state.error = null;
    },
  },
  extraReducers: (build) => {
    build
      // for userRegistation
      .addCase(createUserDataApiSlice.pending, (state) => {
        state.loader = true;
      })
      .addCase(createUserDataApiSlice.fulfilled, (state, action) => {
        state.loader = false;

      state.user = action.payload.createData;

        state.message = action.payload.message;
      })
      .addCase(createUserDataApiSlice.rejected, (state, action) => {
        state.loader = false;
        state.error = action.error.message;
      })
      // for UniquserData
      .addCase(uniqUserDataApiSlice.pending, (state) => {
        state.loader = true;
      })
      .addCase(uniqUserDataApiSlice.fulfilled, (state, action) => {
        state.loader = false;
        console.log(action.payload);
        

        state.uniqUserData = action.payload.uniqUser;

        state.message = action.payload.message;
      })
      .addCase(uniqUserDataApiSlice.rejected, (state, action) => {
        state.loader = false;
        state.error = action.error.message;
      });
  },
});

// selector
export const formValidationSelector = (state) => state.formValidation;
// export actions
export const { setEmtyMessage } = formValidationslice.actions;
// export authSlice reducer
export default formValidationslice.reducer;

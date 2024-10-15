// create authApiSlice

import { createAsyncThunk } from "@reduxjs/toolkit";

import API from "../../apiAxiosInstance/api";

// this is UserRegisterApiSlice
export const createUserDataApiSlice = createAsyncThunk(
  "formValidationslice/createUserDataApiSlice",
  async (data) => {
    console.log(data);
    

    
    
    try {
      const response = await API.post("/user_data",data,{
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// this is UniqUserApiSlice
export const uniqUserDataApiSlice = createAsyncThunk(
  "formValidationslice/uniqUserDataApiSlice",
  async (data) => {
    try {
      const response = await API.post("/uniq_user_data", data);

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

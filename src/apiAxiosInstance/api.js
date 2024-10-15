import axios from "axios";

const API = axios.create({
  baseURL: "https://mernstackformvalidationwithfileuploadbac.onrender.com/api/v1/formValidation",
  timeout: 20000,
  withCredentials: true,
});

export default API;

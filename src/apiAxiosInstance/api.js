import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5050/api/v1/formValidation",
  timeout: 20000,
  withCredentials: true,
});

export default API;

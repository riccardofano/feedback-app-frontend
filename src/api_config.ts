import default_axios from "axios";

const API_URL = import.meta.env.PROD
  ? import.meta.env.VITE_API_URL
  : "http://localhost:8000";
export const axios = default_axios.create({
  baseURL: API_URL,
});

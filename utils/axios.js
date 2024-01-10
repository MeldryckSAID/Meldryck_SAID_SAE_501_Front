import axios from "axios";

export const API = axios.create({
  baseURL: import.meta.env.NUXT_API_URL,
});

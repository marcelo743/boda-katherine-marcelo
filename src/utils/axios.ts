import axios from "axios";

export const api = axios.create({
  baseURL: "/api",
  timeout: 15_000,
  withCredentials: false,
});

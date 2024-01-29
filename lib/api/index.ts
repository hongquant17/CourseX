import axios from "axios";

// Create an Axios instance for API requests
const apiClient = axios.create({
  baseURL: "/api",
  withCredentials: true,
  timeout: 120000,
});

export { apiClient };

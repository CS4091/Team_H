import axios from "axios";

const baseURL = process.env.BACKEND_URL || 'http://localhost:5001'

let headers = {};

const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: headers,
});

export default axiosInstance;

import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  // baseURL: "localhost:5001/api/v1/",
});

export default instance;

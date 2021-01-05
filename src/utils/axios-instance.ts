import axios from "axios";

const instance = (token: string) =>
  axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      authorization: "Bearer " + token,
    },
  });

export default instance;

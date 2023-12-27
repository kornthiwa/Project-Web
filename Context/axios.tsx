import axios from "axios";

const customAxios = axios.create({
  baseURL: "http://localhost:8080/",
  headers: {
    Authorization: "Bearer 1234567890",

  },
});

export default customAxios
import axios from "axios";

const instance = axios.create({
  baseURL: "", // той самий origin, Express віддає і фронт, і API
  withCredentials: false,
});

export default instance;

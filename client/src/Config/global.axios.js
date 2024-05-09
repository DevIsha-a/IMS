import axios from "axios";

const AppInstance = axios.create({
  baseURL: process.env.REACT_APP_API,
});

AppInstance.interceptors.request.use((req) => {
  return req;
});

AppInstance.interceptors.response.use((res) => {
  return res;
});

export default AppInstance;
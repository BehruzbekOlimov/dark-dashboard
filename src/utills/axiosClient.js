import {LOCAL_STORAGE_NAME, SERVER_URL, TOKEN_HEADER} from "./constants";
import axios from "axios";


const defaultOptions = {
  baseURL: SERVER_URL,
  headers: {
    [TOKEN_HEADER]: localStorage.getItem(LOCAL_STORAGE_NAME),
    'Content-Type': 'application/json',
  },
};

const axiosClient = axios.create(defaultOptions);

export default axiosClient

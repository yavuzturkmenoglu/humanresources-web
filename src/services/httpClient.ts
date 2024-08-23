import axios, { AxiosResponse, AxiosError } from "axios";
import { genericErrorToast } from "../components/toasts/customToasts";

const httpClient = axios.create({
  baseURL: `https://localhost:5001`,
  headers: {
    "Content-Type": "application/json",
  },
});

httpClient.interceptors.response.use(
  async function (response: AxiosResponse) {
    return response.data;
  },
  async function (error: AxiosError) {
    genericErrorToast();

    if (!error.response) {
      return { Success: false, Data: undefined, ResultCode: 300 };
    }

    return error.response.data;
  }
);

export default httpClient;

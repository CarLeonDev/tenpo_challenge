import { API_URL } from "@/constants/constants";
import axios, { AxiosRequestConfig } from "axios";

const axiosIntance = axios.create({
  baseURL: API_URL,
});

axiosIntance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosIntance.interceptors.response.use((response) => {
  return response;
}, (error) => {
  return Promise.reject(error);
});

export const get = async ({url, config}: {url: string, config?: AxiosRequestConfig}) => {
  const response = await axiosIntance.get(url, config);
  return response.data;
};

export const post = async ({url, data, config}: {url: string, data: any, config?: AxiosRequestConfig}) => {
  const response = await axiosIntance.post(url, data, config);
  return response.data;
};

export const put = async ({url, data, config}: {url: string, data: any, config?: AxiosRequestConfig}) => {
  const response = await axiosIntance.put(url, data, config);
  return response.data;
};

export default {
  get,
  post,
  put,
};


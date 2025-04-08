import axios, { AxiosRequestConfig } from "axios";

const API_URL = 'https://dummyjson.com/auth/login';

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
});

const get = async ({url, config}: {url: string, config?: AxiosRequestConfig}) => {
  const response = await axiosIntance.get(url, config);
  return response.data;
};

const post = async ({url, data, config}: {url: string, data: any, config?: AxiosRequestConfig}) => {
  const response = await axiosIntance.post(url, data, config);
  return response.data;
};

const put = async ({url, data, config}: {url: string, data: any, config?: AxiosRequestConfig}) => {
  const response = await axiosIntance.put(url, data, config);
  return response.data;
};


export default {
  get,
  post,
  put,
};


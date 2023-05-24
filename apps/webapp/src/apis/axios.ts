import axios from 'axios';
import { useStytch } from '@stytch/react';

const useAxios = () => {
  const session = useStytch().session;
  const baseURL = process.env.VITE_BACKEND_URL || 'http://localhost:8080/api';
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  };

  const axiosInstance = axios.create({ baseURL, headers });

  // Create an interceptor to update the session_token in headers
  axiosInstance.interceptors.request.use(
    async (config) => {
      const session_token = (await session.getTokens())?.session_token || '';
      config.headers['sessiontoken'] = session_token;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default useAxios;

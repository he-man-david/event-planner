import axios from 'axios';
import { useStytch } from '@stytch/react';

const useAxios = () => {
  const session_token = useStytch().session.getTokens()?.session_token || '';
  console.log("session_token", session_token.substring(0, 3));
  const baseURL = 'http://localhost:8080/';
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    session_token,
  };

  return axios.create({ baseURL, headers });
};

export default useAxios;

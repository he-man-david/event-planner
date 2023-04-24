import {
    GetEventMembersResponse,
    GetEventMembersRequest,
  } from '@event-planner/types/src';
  import axios from 'axios';
  
  const url = 'http://localhost:8080/members';
  
  const axiosConfig = {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
  };
   
  export const GetMembers = async (
    req: GetEventMembersRequest,
    token: string
  ): Promise<GetEventMembersResponse> => {
    try {
      const config:any = {...axiosConfig};
      config.headers["session_token"] = token;
      const res = await axios.get(url, { ...config, params: req });
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  
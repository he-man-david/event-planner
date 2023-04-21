import {
  CreateEventOptionResponse,
  CreateEventOptionRequest,
  UpdateEventOptionRequest,
  UpdateEventOptionResponse,
} from '@event-planner/types/src';
import axios from 'axios';

const url = 'http://localhost:8080/options';

const axiosConfig = {
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  },
};

export const CreateOption = async (
  req: CreateEventOptionRequest,
  token: string
): Promise<CreateEventOptionResponse> => {
  try {
    const config:any = {...axiosConfig};
    config.headers["session_token"] = token;
    const res = await axios.post(url, req, config);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const UpdateOption = async (
  id: string,
  req: UpdateEventOptionRequest,
  token: string
): Promise<UpdateEventOptionResponse> => {
  try {
    const config:any = {...axiosConfig};
    config.headers["session_token"] = token;
    const res = await axios.put(`${url}/${id}`, req, config);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

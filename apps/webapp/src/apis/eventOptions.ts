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
  req: CreateEventOptionRequest
): Promise<CreateEventOptionResponse> => {
  try {
    const res = await axios.post(url, req, axiosConfig);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const UpdateOption = async (
  id: string,
  req: UpdateEventOptionRequest
): Promise<UpdateEventOptionResponse> => {
  try {
    const res = await axios.put(`${url}/${id}`, req, axiosConfig);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

import {
  UpdateUserRequest,
  UpdateUserResponse,
} from '@event-planner/types/src';
import axios from 'axios';

const url = 'http://localhost:8080/users';

const axiosConfig = {
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  },
};

export const UpdateUser = async (
  req: UpdateUserRequest
): Promise<UpdateUserResponse> => {
  try {
    const res = await axios.post(url, req);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

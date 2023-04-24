import {
  CreateEventCommentRequest,
  CreateEventCommentResponse,
  GetEventCommentsRequest,
  GetEventCommentsResponse,
} from '@event-planner/types/src';
import axios from 'axios';

const url = 'http://localhost:8080/comments';

const axiosConfig = {
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  },
};

export const CreateComment = async (
  req: CreateEventCommentRequest,
  token: string
): Promise<CreateEventCommentResponse> => {
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

export const GetComments = async (
  req: GetEventCommentsRequest,
  token: string
): Promise<GetEventCommentsResponse> => {
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

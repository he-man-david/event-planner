import {
  CreateEventRequest,
  UpdateEventRequest,
  EventResponse,
  GetEventsRequest,
  GetEventsResponse,
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
  req: CreateEventCommentRequest
): Promise<CreateEventCommentResponse> => {
  try {
    const res = await axios.post(url, req);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const GetComments = async (
  req: GetEventCommentsRequest
): Promise<GetEventCommentsResponse> => {
  try {
    const res = await axios.get(url, { ...axiosConfig, params: req });
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

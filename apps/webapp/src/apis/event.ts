import {
  CreateEventRequest,
  UpdateEventRequest,
  EventResponse,
  GetEventsRequest,
  GetEventsResponse,
} from '@event-planner/types/src';
import axios from 'axios';

const url = 'http://localhost:8080/events';

const axiosConfig = {
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  },
};

const commonErrorHandler = (err: any) => {
  console.error(err);
  throw err;
};

export const CreateEvent = async (
  req: CreateEventRequest,
  token: string
): Promise<EventResponse> => {
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

export const UpdateEvent = async (
  eventId: string,
  req: UpdateEventRequest,
  token: string
): Promise<EventResponse> => {
  try {
    const config:any = {...axiosConfig};
    config.headers["session_token"] = token;
    const res = await axios.put(url + `/${eventId}`, req, config);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const GetEvent = async (eventId: string,
  token: string): Promise<EventResponse> => {
  try {
    const config:any = {...axiosConfig};
    config.headers["session_token"] = token;
    const res = await axios.get(url + `/${eventId}`, config);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const GetEvents = async (
  req: GetEventsRequest,
  token: string
): Promise<GetEventsResponse> => {
  const config:any = {...axiosConfig};
  config.headers["session_token"] = token;
  return await axios
    .get(url, { ...config, params: req })
    .then((res) => res.data)
    .catch(commonErrorHandler);
};

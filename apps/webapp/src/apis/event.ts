import {
  CreateEventRequest,
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
  req: CreateEventRequest
): Promise<EventResponse> => {
  try {
    const res = await axios.post(url, req);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const GetEvent = async (eventId: string): Promise<EventResponse> => {
  try {
    const res = await axios.get(url + `/${eventId}`, axiosConfig);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const GetEvents = async (
  req: GetEventsRequest
): Promise<GetEventsResponse | undefined> => {
  return await axios
    .get(url, { ...axiosConfig, params: req })
    .then((res) => res.data)
    .catch(commonErrorHandler);
};

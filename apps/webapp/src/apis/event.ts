import { CreateEventRequest, EventResponse } from '@event-planner/types/src';
import axios from 'axios';

const url = 'http://localhost:8080/events';

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json',
};

export const CreateEvent = async (
  req: CreateEventRequest
): Promise<EventResponse | undefined> => {
  try {
    const res = await axios.post(url, req);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const GetEvent = async (
  eventId: string
): Promise<EventResponse | undefined> => {
  try {
    const res = await axios.get(url + `/${eventId}`, {
      headers,
    });
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

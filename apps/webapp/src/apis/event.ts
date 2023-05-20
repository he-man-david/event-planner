import {
  CreateEventRequest,
  UpdateEventRequest,
  EventResponse,
  GetEventsRequest,
  GetEventsResponse,
} from '@event-planner/types/src';
import useAxios from './axios';

const useEventsApi = () => {
  const instance = useAxios();

  const CreateEvent = async (
    req: CreateEventRequest
  ): Promise<EventResponse> => {
    try {
      const res = await instance.post('/events', req);
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const UpdateEvent = async (
    eventId: string,
    req: UpdateEventRequest
  ): Promise<EventResponse> => {
    try {
      const res = await instance.put(`/events/${eventId}`, req);
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const GetEvent = async (eventId: string): Promise<EventResponse> => {
    try {
      const res = await instance.get(`/events/${eventId}`);
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const DeleteEvent = async (eventId: string): Promise<EventResponse> => {
    try {
      const res = await instance.delete(`/events/${eventId}`);
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const GetEvents = async (
    req: GetEventsRequest
  ): Promise<GetEventsResponse> => {
    try {
      const res = await instance.get('/events', { params: req });
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return {
    Create: CreateEvent,
    Update: UpdateEvent,
    Get: GetEvent,
    List: GetEvents,
    Delete: DeleteEvent,
  };
};

export default useEventsApi;

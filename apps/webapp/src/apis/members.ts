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
    req: GetEventMembersRequest
  ): Promise<GetEventMembersResponse> => {
    try {
      const res = await axios.get(url, { ...axiosConfig, params: req });
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  
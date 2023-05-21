import { CalendarInviteEmailRequest } from '@event-planner/types/src';
import useAxios from './axios';
import { useState } from 'react';

const useEmailsApi = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const instance = useAxios();
  const SendCalendarInviteEmail = async (
    req: CalendarInviteEmailRequest
  ): Promise<boolean> => {
    setLoading(true);
    try {
      const res = await instance({
        url: 'emails/',
        method: 'POST',
        data: req,
      });
      setLoading(false);
      return res.data;
    } catch (error) {
      console.error(error);
      setLoading(false);
      throw error;
    }
  };

  return {
    SendCalendarInvite: SendCalendarInviteEmail,
    isLoading: loading,
  };
};

export default useEmailsApi;

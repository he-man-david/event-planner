import {
  GetEventMembersResponse,
  GetEventMembersRequest,
} from '@event-planner/types/src';
import useAxios from './axios';

const useMembersApi = () => {
  const instance = useAxios();
  const GetMembers = async (
    req: GetEventMembersRequest
  ): Promise<GetEventMembersResponse> => {
    try {
      const res = await instance({
        url: 'members/',
        method: 'GET',
        params: req,
      });
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return {
    Get: GetMembers,
  };
};

export default useMembersApi;

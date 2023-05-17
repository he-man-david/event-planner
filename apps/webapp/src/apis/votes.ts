import { ToogleEventOptionVoteRequest } from '@event-planner/types/src';
import useAxios from './axios';

const useVotesApi = () => {
  const instance = useAxios();

  const Vote = async (req: ToogleEventOptionVoteRequest): Promise<boolean> => {
    try {
      const res = await instance({
        url: 'votes/',
        method: 'POST',
        data: req,
      });
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return {
    Vote,
  };
};

export default useVotesApi;

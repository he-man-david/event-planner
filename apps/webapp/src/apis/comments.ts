import {
  CreateEventCommentRequest,
  CreateEventCommentResponse,
  GetEventCommentsRequest,
  GetEventCommentsResponse,
} from '@event-planner/types/src';
import useAxios from './axios';

const useCommentsApi = () => {
  const instance = useAxios();

  const CreateComment = async (
    req: CreateEventCommentRequest
  ): Promise<CreateEventCommentResponse> => {
    try {
      const res = await instance({
        url: 'comments/',
        method: 'POST',
        data: req,
      });
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const GetComments = async (
    req: GetEventCommentsRequest
  ): Promise<GetEventCommentsResponse> => {
    try {
      const res = await instance({
        url: 'comments/',
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
    Create: CreateComment,
    Get: GetComments,
  };
};

export default useCommentsApi;

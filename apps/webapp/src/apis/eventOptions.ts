import {
  CreateEventOptionResponse,
  CreateEventOptionRequest,
  UpdateEventOptionRequest,
  UpdateEventOptionResponse,
} from '@event-planner/types/src';
import useAxios from './axios';

const useOptionsApi = () => {
  const instance = useAxios();
  const url = '/options';

  const CreateOption = async (
    req: CreateEventOptionRequest
  ): Promise<CreateEventOptionResponse> => {
    try {
      const res = await instance.post(url, req);
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const UpdateOption = async (
    id: string,
    req: UpdateEventOptionRequest
  ): Promise<UpdateEventOptionResponse> => {
    try {
      const res = await instance.put(`${url}/${id}`, req);
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return {
    Create: CreateOption,
    Update: UpdateOption,
  };
};

export default useOptionsApi;

import {
  CreateEventOptionResponse,
  CreateEventOptionRequest,
  UpdateEventOptionRequest,
  UpdateEventOptionResponse,
  GetEventOptionsRequest,
  GetEventOptionsResponse,
  DeleteEventOptionRequest,
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

  const GetOption = async (
    req: GetEventOptionsRequest
  ): Promise<GetEventOptionsResponse> => {
    try {
      const res = await instance.get(`${url}`, { params: req });
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  const DeleteOption = async (req: DeleteEventOptionRequest) => {
    
    try {
      const res = await instance.delete(`${url}`, { data: req });
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  return {
    Get: GetOption,
    Create: CreateOption,
    Update: UpdateOption,
    Delete: DeleteOption
  };
};

export default useOptionsApi;

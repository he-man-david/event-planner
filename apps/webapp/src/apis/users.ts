import {
  UpdateUserRequest,
  UpdateUserResponse,
} from '@event-planner/types/src';
import useAxios from './axios';

const useUpdateUserApi = () => {
  const instance = useAxios();

  const UpdateUser = async (
    req: UpdateUserRequest
  ): Promise<UpdateUserResponse> => {
    try {
      const res = await instance({
        url: '/users',
        method: 'POST',
        data: req,
      });
      return res.data;
    } catch (error) {
      console.log("Failed to update user in DB.");
      console.log("The user may not have been created which will fail all event operations.")
      console.error(error);
      throw error;
    }
  };

  return {
    Update: UpdateUser,
  };
};

export default useUpdateUserApi;

import { z } from 'zod';

import { User } from '@prisma/client';

//UPDATE User
export const UpdateUserRequestParser = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  imageUrl: z.string().nullable(),
});
export type UpdateUserRequest = typeof UpdateUserRequestParser._type;
export type UpdateUserResponse = User;

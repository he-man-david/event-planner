import { Response, Router } from 'express';
import asyncHandler from 'express-async-handler';
import * as db from '@event-planner/db';
import { UpdateUserRequestParser, UpdateUserResponse } from '@event-planner/types';

const router = Router();

router.post(
  '/',
  asyncHandler(async (req, res: Response<UpdateUserResponse>) => {
    const updateUserReq = UpdateUserRequestParser.parse(
      req.body
    );
    res.send(await db.updateUser(updateUserReq));
  })
);

export default router;

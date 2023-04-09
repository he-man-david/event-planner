import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import {
  CreateEventMemberRequestParser,
  DeleteEventMembersRequestParser,
  GetEventMembersResponse,
  CreateEventMemberResponse,
  DeleteEventMembersResponse,
  GetEventMembersRequestParser,
} from '@event-planner/types';
import * as db from '@event-planner/db';
import { Response } from 'express';

const router = Router();

router.get(
  '/',
  asyncHandler(async (req, res: Response<GetEventMembersResponse>) => {
    const query = GetEventMembersRequestParser.parse(req.query);
    const result = await db.getEventMembers(query);
    res.send(result);
  })
);

router.post(
  '/',
  asyncHandler(async (req, res: Response<CreateEventMemberResponse>) => {
    const addUserToEventRequest = CreateEventMemberRequestParser.parse(
      req.body
    );
    res.send(await db.addUserToEvent(addUserToEventRequest));
  })
);

router.delete(
  '/',
  asyncHandler(async (req, res: Response<DeleteEventMembersResponse>) => {
    const removeUsersFromEventRequest = DeleteEventMembersRequestParser.parse(
      req.body
    );
    res.send(await db.removeUsersFromEvent(removeUsersFromEventRequest));
  })
);

export default router;

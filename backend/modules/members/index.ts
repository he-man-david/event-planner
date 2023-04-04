import { Request, Router } from "express";
import asyncHandler from "express-async-handler";
import {
  PostEventMemberRequestBody,
  DeleteManyEventMembersRequestBody,
  UUID,
  GetMultipleEventMembersResponse,
  GetMultipleEventCommentsRequestQuery,
  PostEventMemberResponse,
  DeleteEventOptionResponse,
  DeleteManyEventMembersResponse,
  GetMultipleEventMembersRequestQuery,
} from "../../types";
import db from "../../db";
import { Response } from "express";

const router = Router();

router.get(
  "/",
  asyncHandler(async (req, res: Response<GetMultipleEventMembersResponse>) => {
    const query = GetMultipleEventMembersRequestQuery.parse(req.query);
    const result = await db.getEventMembers(query);
    res.send(result);
  })
);

router.post(
  "/",
  asyncHandler(async (req, res: Response<PostEventMemberResponse>) => {
    const addUserToEventRequest = PostEventMemberRequestBody.parse(req.body);
    res.send(await db.addUserToEvent(addUserToEventRequest));
  })
);

router.delete(
  "/",
  asyncHandler(async (req, res: Response<DeleteManyEventMembersResponse>) => {
    const removeUsersFromEventRequest = DeleteManyEventMembersRequestBody.parse(
      req.body
    );
    res.send(await db.removeUsersFromEvent(removeUsersFromEventRequest));
  })
);

export default router;

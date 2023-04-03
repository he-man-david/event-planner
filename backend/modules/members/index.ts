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
} from "../../types";
import db from "../../db";
import { Response } from "express";
import { EventMember } from "@prisma/client";

const router = Router();

router.get(
  "/",
  asyncHandler(async (req, res: Response<GetMultipleEventMembersResponse>) => {
    if (req.query) {
      const eventId = UUID.parse(req.query.eventId);
      const result = await db.getEventMembers(eventId);
      res.send({
        content: result,
        pageInfo: {
          size: result.length,
          offset: 0,
          hasNext: false,
          totalCount: result.length,
        },
      });
    } else {
      res.send();
    }
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
    res.send(
      await db.removeUsersFromEvent(removeUsersFromEventRequest.eventMemberIds)
    );
  })
);

export default router;

import { Router } from "express";
import asyncHandler from "express-async-handler";
import {
  AddUserToEventRequest,
  RemoveUsersFromEventRequest,
  UUID,
} from "../../types";
import db from "../../db";

const router = Router();

router.get(
  "/:eventId",
  asyncHandler(async (req, res) => {
    const eventId = UUID.parse(req.params.eventId);
    res.send(await db.getEventMembers(eventId));
  })
);

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const addUserToEventRequest = AddUserToEventRequest.parse(req.body);
    const result = await db.addUserToEvent(addUserToEventRequest);
    res.send(result);
  })
);

router.delete(
  "/",
  asyncHandler(async (req, res) => {
    const removeUsersFromEventRequest = RemoveUsersFromEventRequest.parse(
      req.body
    );
    const result = await db.removeUsersFromEvent(removeUsersFromEventRequest);
    res.send(result);
  })
);

export default router;

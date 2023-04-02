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
  "/",
  asyncHandler(async (req, res) => {
    if (req.query.eventId) {
      const eventId = UUID.parse(req.query.eventId);
      res.send(await db.getEventMembers(eventId));
    } else {
      res.send([]);
    }
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

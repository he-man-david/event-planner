import { Router } from "express";
import asyncHandler from "express-async-handler";
import { AddUserToEventRequest, RemoveUsersFromEventRequest } from "../types";
import eventPlannerRepo from "../repositories/event_planner";

const router = Router();
router.post(
  "/",
  asyncHandler(async (req, res) => {
    const addUserToEventRequest = AddUserToEventRequest.parse(req.body);
    const result = await eventPlannerRepo.addUserToEvent(addUserToEventRequest);
    res.send(result);
  })
);

router.delete(
  "/",
  asyncHandler(async (req, res) => {
    const removeUsersFromEventRequest = RemoveUsersFromEventRequest.parse(
      req.body
    );
    const result = await eventPlannerRepo.removeUsersFromEvent(
      removeUsersFromEventRequest
    );
    res.send(result);
  })
);

export default router;

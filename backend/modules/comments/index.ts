import { Router } from "express";
import asyncHandler from "express-async-handler";
import repo from "../../db";
import { AddEventCommentRequest, UUID } from "../../types";

const router = Router();

router.get(
  "/:eventId",
  asyncHandler(async (req, res) => {
    const eventId = UUID.parse(req.params.eventId);
    res.send(await repo.getEventComments(eventId));
  })
);

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const addEventCommentReq = AddEventCommentRequest.parse(req.body);
    res.send(await repo.addEventComment(addEventCommentReq));
  })
);

export default router;

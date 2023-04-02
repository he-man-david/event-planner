import { Router } from "express";
import asyncHandler from "express-async-handler";
import repo from "../../db";
import { PostEventCommentRequestBody, UUID } from "../../types";

const router = Router();

router.get(
  "/",
  asyncHandler(async (req, res) => {
    if (req.query.eventId) {
      const eventId = UUID.parse(req.query.eventId);
      res.send(await repo.getEventComments(eventId));
    } else {
      res.send([]);
    }
  })
);

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const addEventCommentReq = PostEventCommentRequestBody.parse(req.body);
    res.send(await repo.addEventComment(addEventCommentReq));
  })
);

export default router;

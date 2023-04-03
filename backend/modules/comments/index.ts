import { Router } from "express";
import asyncHandler from "express-async-handler";
import repo from "../../db";
import { GetMultipleEventCommentsRequestQuery, PostEventCommentRequestBody, UUID } from "../../types";

const router = Router();

router.get(
  "/",
  asyncHandler(async (req, res) => {
    if (req.query) {
      const query = GetMultipleEventCommentsRequestQuery.parse(req.query);
      res.send(await repo.getEventComments(query.eventId));
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

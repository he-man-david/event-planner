import { Router } from "express";
import asyncHandler from "express-async-handler";
import repo from "../../db";
import { PostEventOptionVoteRequestBody, UUID } from "../../types";

const router = Router();

router.get(
  "/",
  asyncHandler(async (req, res) => {
    if (req.query.eventOptionId) {
      const eventOptionId = UUID.parse(req.params.eventOptionId);
      res.send(await repo.getEventOptionVotes(eventOptionId));
    } else {
      res.send([]);
    }
  })
);

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const toogleEventOptionReq = PostEventOptionVoteRequestBody.parse(req.body);
    res.send(await repo.toggleEventOptionVote(toogleEventOptionReq));
  })
);

export default router;

import { Router } from "express";
import asyncHandler from "express-async-handler";
import repo from "../../db";
import { ToggleEventOptionVoteRequest, UUID } from "../../types";

const router = Router();

router.get(
  "/:eventOptionId",
  asyncHandler(async (req, res) => {
    const eventOptionId = UUID.parse(req.params.eventOptionId);
    res.send(await repo.getEventOptionVotes(eventOptionId));
  })
);

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const toogleEventOptionReq = ToggleEventOptionVoteRequest.parse(req.body);
    res.send(await repo.toggleEventOptionVote(toogleEventOptionReq));
  })
);

export default router;

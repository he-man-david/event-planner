import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import * as db from 'libs/db/src';
import { PostEventOptionVoteRequestBody, UUID } from 'libs/types/src';

const router = Router();

router.get(
  '/',
  asyncHandler(async (req, res) => {
    if (req.query.eventOptionId) {
      const eventOptionId = UUID.parse(req.params.eventOptionId);
      res.send(await db.getEventOptionVotes(eventOptionId));
    } else {
      res.send([]);
    }
  })
);

router.post(
  '/',
  asyncHandler(async (req, res) => {
    const toogleEventOptionReq = PostEventOptionVoteRequestBody.parse(req.body);
    res.send(await db.toggleEventOptionVote(toogleEventOptionReq));
  })
);

export default router;

import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import * as db from '@event-planner/db';
import { ToggleEventOptionVoteRequestParser, UUID } from '@event-planner/types';

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
    const toogleEventOptionReq = ToggleEventOptionVoteRequestParser.parse(
      req.body
    );
    res.send(await db.toggleEventOptionVote(toogleEventOptionReq));
  })
);

export default router;

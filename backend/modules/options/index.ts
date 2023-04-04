import { Response, Router } from "express";
import asyncHandler from "express-async-handler";
import {
  PostEventOptionRequestBody,
  DeleteEventOptionRequestBody,
  UUID,
  GetEventOptionsResponse,
  GetEventOptionsQueryParser,
} from "../../types";
import eventPlannerRepo from "../../db";

const router = Router();

router.get(
  "/",
  asyncHandler(async (req, res: Response<GetEventOptionsResponse>) => {
    const query = GetEventOptionsQueryParser.parse(req.query);
    const result = await eventPlannerRepo.getEventOptions(query);
    res.send(result);
  })
);

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const createEventOptionReq = PostEventOptionRequestBody.parse(req.body);
    const result = await eventPlannerRepo.createEventOptions(
      createEventOptionReq
    );
    res.send(result);
  })
);

router.put(
  "/",
  asyncHandler(async (req, res) => {
    res.status(500);
    res.send("Not implemented yet!");
  })
);

router.delete(
  "/",
  asyncHandler(async (req, res) => {
    const deleteEventOptionReq = DeleteEventOptionRequestBody.parse(req.body);
    const result = await eventPlannerRepo.deleteEventOption(
      deleteEventOptionReq
    );
    res.send(result);
  })
);

export default router;

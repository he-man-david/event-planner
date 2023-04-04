import { Response, Router } from "express";
import asyncHandler from "express-async-handler";
import repo from "../../db";
import {
  GetMultipleEventCommentsRequestQuery,
  GetMultipleEventCommentsResponse,
  PostEventCommentRequestBody,
  PostEventCommentResponse,
} from "../../types";

const router = Router();

router.get(
  "/",
  asyncHandler(async (req, res: Response<GetMultipleEventCommentsResponse>) => {
    const query = GetMultipleEventCommentsRequestQuery.parse(req.query);
    res.send(await repo.getEventComments(query));
  })
);

router.post(
  "/",
  asyncHandler(async (req, res: Response<PostEventCommentResponse>) => {
    const addEventCommentReq = PostEventCommentRequestBody.parse(req.body);
    res.send(await repo.addEventComment(addEventCommentReq));
  })
);

export default router;

import { Response, Router } from 'express';
import asyncHandler from 'express-async-handler';
import axios from 'axios';

const router = Router();

const emailServiceUrl =
  process.env.NX_EMAILSERVICE_URL ?? 'http://localhost:7070';

router.post(
  '/',
  asyncHandler(async (req, res: Response<string>) => {
    const result = await axios.post(emailServiceUrl, req.body);
    res.send(result.data.message);
  })
);

export default router;

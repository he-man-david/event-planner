import { Response, Router } from 'express';
import asyncHandler from 'express-async-handler';
import axios from 'axios';

const router = Router();

router.post(
  '/',
  asyncHandler(async (req, res: Response<string>) => {
    const result = await axios.post('http:localhost:7070', req.body);
    res.send(result.data.message);
  })
);

export default router;

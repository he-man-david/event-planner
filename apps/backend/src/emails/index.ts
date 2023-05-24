import { Response, Router } from 'express';
import asyncHandler from 'express-async-handler';
import axios from 'axios';

const router = Router();

router.post(
  '/',
  asyncHandler(async (req, res: Response<string>) => {
    const result = await axios.post(
      'https://oyster-app-64pps.ondigitalocean.app/emailservice',
      req.body
    );
    res.send(result.data.message);
  })
);

export default router;

import { Request, Response } from 'express';
import * as stytch from 'stytch';
import { User } from 'stytch/types/lib/b2c/shared_b2c';
import { z } from 'zod';

const stytchEnv =
  process.env.ENVIRONMENT === 'development'
    ? stytch.envs.test
    : stytch.envs.live;

const config = {
  project_id: process.env.NX_STYTCH_PROJECT_ID || '',
  secret: process.env.NX_STYTCH_SECRET || '',
  env: stytchEnv,
};

const client = new stytch.Client(config);

export const errorHandler = (err: any, req: any, res: any, next: any) => {
  // TODO - add more error handlers like 403, 401 etc.
  console.error(err.stack);

  if (err instanceof z.ZodError) {
    res.status(400).send(err.issues);
    return;
  }

  res.status(500).send('Internal Server!');
};

export const StytchTokenAuth = async (
  err: any,
  req: Request,
  res: Response,
  next: any
) => {
  const session_token = String(req.headers.sessionToken);
  try {
    const authRes = await client.sessions.authenticate({ session_token });
    res.locals.user = authRes.user;
    next();
  } catch (error) {
    res.status(401).json(error);
  }
};

import { Request, Response } from 'express';
import * as stytch from 'stytch';
import { z } from 'zod';
import { unless } from "express-unless";
import { isGetEventApiCall } from './events';

console.log("Creating middlewares");

const stytchEnv =
  process.env.NX_ENVIRONMENT === 'development'
    ? stytch.envs.test
    : stytch.envs.live;

const config = {
  project_id: process.env.NX_STYTCH_PROJECT_ID || '',
  secret: process.env.NX_STYTCH_SECRET || '',
  env: stytchEnv,
};

const client = new stytch.Client(config);

export const errorHandler = (err: any, req: any, res: any, next: any) => {
  // Printing the stack trace so we can see the errors
  console.error(err.stack);

  if (err instanceof z.ZodError) {
    res.status(400).send(err.issues);
    return;
  }

  res.status(500).send('Internal Server!');
};

export const StytchTokenAuth = async (
  req: Request,
  res: Response,
  next: any
) => {
  const session_token = String(req.headers.sessiontoken || "");

  if (!session_token && isGetEventApiCall(req)) {
    next()
    return;
  }
  try {
    const authRes = await client.sessions.authenticate({ session_token });
    if (!authRes.user) {
      throw new Error("User is missing!");
    }
    res.locals.user = authRes.user;    
    next();
  } catch (error) {
    console.log("Session token is empty or user is not athorized!");
    console.error(error);
    res.status(401).send("No where to go :(");
  }
};

// add unless function to allow filtering out paths from middleware
StytchTokenAuth.unless = unless;

import * as stytch from "stytch";

const stytchEnv =
  process.env.ENVIRONMENT === "development"
    ? stytch.envs.test
    : stytch.envs.live;

const config = {
  project_id: process.env.STYTCH_PROJECT_ID!,
  secret: process.env.STYTCH_SECRET!,
  env: stytchEnv,
};

const client = new stytch.Client(config);

export const errorHandler = (err: any, req: any, res: any, next: any) => {
  // TODO - add more error handlers like 404, 403, 401 etc.
  console.error(err.stack);
  res.status(500).send("Internal Server!");
};

export const StytchTokenAuth = async (
  err: any,
  req: any,
  res: any,
  next: any
) => {
  const session_token = req.headers.sessionToken;
  try {
    await client.sessions.authenticate({ session_token });
    next();
  } catch (error) {
    res.status(401).json(error);
  }
};

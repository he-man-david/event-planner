export const errorHandler = (err: any, req: any, res: any, next: any) => {
  // TODO - add more error handlers like 404, 403, 401 etc.
  console.error(err.stack);
  res.status(500).send("Internal Server!");
};

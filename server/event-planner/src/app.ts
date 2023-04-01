import express from "express";
import { errorHandler } from "./middleware";
import eventRoutes from "./routes/event";
import commentRoutes from "./routes/comments";
import userRoutes from "./routes/user";
import votesRoutes from "./routes/votes";
import asyncHandler from "express-async-handler";
import { PORT } from "./config/env";

const app = express();

app.use(express.json());

// TODO: add stytch middleware here

// health check endpoint
app.get("/", (_, res) => {
  res.send(true);
});

app.use("/event", asyncHandler(eventRoutes));
app.use("/comments", asyncHandler(commentRoutes));
app.use("/user", asyncHandler(userRoutes));
app.use("/votes", asyncHandler(votesRoutes));

// Error handler has to be last middleware!
app.use(errorHandler);

console.log(`Server starting at port ${PORT}`);
app.listen(PORT);

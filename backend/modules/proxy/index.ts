require("dotenv").config();

import express from "express";
import { errorHandler, StytchTokenAuth } from "./middleware";
import eventRoutes from "../events";
import commentRoutes from "../comments";
import optionsRoutes from "../options";
import votesRoutes from "../votes";
import attendeesRoutes from "../members";
import asyncHandler from "express-async-handler";
import { PORT } from "./env";

const app = express();

app.use(express.json());

// Stytch middleware for sessiontoken auth
app.use(StytchTokenAuth);

// TODO: add stytch middleware here
// the middleware will contain token validation and provide the userId

// health check endpoint
app.get("/", (_, res) => {
  res.send(true);
});

// TODO change to memebers
app.use("/attendees", asyncHandler(attendeesRoutes));
app.use("/comments", asyncHandler(commentRoutes));
app.use("/events", asyncHandler(eventRoutes));
app.use("/options", asyncHandler(optionsRoutes));
app.use("/votes", asyncHandler(votesRoutes));

// Error handler has to be last middleware!
app.use(errorHandler);

console.log(`Server at port ${PORT}`);
app.listen(PORT);

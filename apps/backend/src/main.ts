import express from 'express';
import { errorHandler, StytchTokenAuth } from './middleware';
import eventRoutes from './events';
import commentRoutes from './comments';
import optionsRoutes from './options';
import votesRoutes from './votes';
import attendeesRoutes from './members';
import asyncHandler from 'express-async-handler';
import cors from 'cors';
import { PORT } from './env';
import dotenv from 'dotenv';
dotenv.config();

const allowedOrigins = ['http://localhost:4200'];

const corsOptions = {
  origin: function (origin: any, callback: any) {
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

const app = express();

app.use(cors());
app.use(express.json());

app.use(cors(corsOptions));

// Stytch middleware for sessiontoken auth
app.use(StytchTokenAuth);

// TODO: add stytch middleware here
// the middleware will contain token validation and provide the userId

// health check endpoint
app.get('/', (_, res) => {
  res.send(true);
});

// TODO change to memebers
app.use('/attendees', asyncHandler(attendeesRoutes));
app.use('/comments', asyncHandler(commentRoutes));
app.use('/events', asyncHandler(eventRoutes));
app.use('/options', asyncHandler(optionsRoutes));
app.use('/votes', asyncHandler(votesRoutes));

// Error handler has to be last middleware!
app.use(errorHandler);

console.log(`Server at port ${PORT}`);
app.listen(PORT);

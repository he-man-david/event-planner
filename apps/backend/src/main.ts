import express from 'express';
import { errorHandler, StytchTokenAuth } from './middleware';
import eventRoutes from './events';
import commentRoutes from './comments';
import optionsRoutes from './options';
import votesRoutes from './votes';
import membersRoutes from './members';
import usersRoutes from './users';
import emailsRoutes from './emails';
import asyncHandler from 'express-async-handler';
import cors from 'cors';
import { PORT } from './env';
import dotenv from 'dotenv';
import * as _ from 'lodash';
dotenv.config();

const allowedOrigins = ['http://localhost:4200', 'http://localhost:8080'];

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

app.use(express.json());

app.use(cors(corsOptions));

// health check endpoint
app.get('/', (_, res) => {
  res.send(true);
});

// Stytch middleware for sessiontoken auth
app.use(StytchTokenAuth);

app.use('/members', asyncHandler(membersRoutes));
app.use('/comments', asyncHandler(commentRoutes));
app.use('/events', asyncHandler(eventRoutes));
app.use('/options', asyncHandler(optionsRoutes));
app.use('/votes', asyncHandler(votesRoutes));
app.use('/users', asyncHandler(usersRoutes));
app.use('/emails', asyncHandler(emailsRoutes));

// Error handler has to be last middleware!
app.use(errorHandler);

console.log(`Server at port ${PORT}`);
app.listen(PORT);

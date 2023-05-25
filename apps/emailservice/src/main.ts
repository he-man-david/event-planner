import express from 'express';
import { sendEmail, getIcalObjectInstance } from './index';
import calendarInviteHtml from './calendarInviteHtml';
import { calendarInviteEmailRequestParser } from '@event-planner/types';

const host = process.env.NX_CLOUD_HOST ?? 'localhost';
const port = process.env.NX_EMAILSERVICE_PORT
  ? Number(process.env.NX_EMAILSERVICE_PORT)
  : 7070;

const app = express();
app.use(express.json());

// TODO: set cors here to only take calls from our backend

// health check endpoint
app.get('/', (_, res) => {
  res.send(true);
});

app.post('/', (req, res) => {
  const request = calendarInviteEmailRequestParser.parse(req.body);
  const { toEmail, toName, fromDate, toDate, eventName, eventUrl } = request;

  // Creating HTML template for email
  const html = calendarInviteHtml(
    toName,
    fromDate,
    toDate,
    eventName,
    eventUrl
  );

  const cal = getIcalObjectInstance(
    fromDate,
    toDate,
    'Calendar invite',
    eventName,
    eventUrl,
    eventUrl
  );

  sendEmail(
    'teamtartar@gmail.com',
    toEmail,
    'Join us! - ' + eventName,
    html,
    cal
  );
  res.send({ message: 'Event calendar invite sent' });
});

app.listen(port, host, () => {
  console.log(`[Email service] http://${host}:${port}`);
});

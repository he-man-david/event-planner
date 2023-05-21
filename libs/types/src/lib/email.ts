import { z } from 'zod';

export const calendarInviteEmailRequestParser = z.object({
  toEmail: z.string(),
  toName: z.string(),
  fromDate: z.string(),
  toDate: z.string(),
  eventName: z.string(),
  eventUrl: z.string(),
});

export type CalendarInviteEmailRequest =
  typeof calendarInviteEmailRequestParser._type;

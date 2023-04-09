import { Event, EventMember, EventOption } from '@prisma/client';
import { EventOptionBodyParser } from './eventOptions';
import { Page, UUID, EventOptionWithVoteCounts } from './common';
import { z } from 'zod';
import dayjs = require('dayjs');

export type EventResponse = Event & {
  attendees: EventMember[];
  options: EventOption[];
};

// GET event
export const GetEventRequestParser = UUID;
export type GetEventRequest = typeof GetEventRequestParser._type;
export type GetEventResponse =
  | (Event & {
      attendees: EventMember[];
      options: EventOptionWithVoteCounts[];
    })
  | null;

// CREATE event
export const CreateEventRequestParser = z.object({
  title: z.string(),
  eventStart: z.string(),
  eventEnd: z.string(),
  createdBy: z.string(), // Stytch user-id here is not uuid - user-test-1975b99d-63fd-48ac-93ce-4ebe9bea5a81
  options: z.array(EventOptionBodyParser).optional(),
});
export type CreateEventRequest = typeof CreateEventRequestParser._type;

// GET events
export const GetEventsRequestParser = z.object({
  eventStartBefore: z.string().default(dayjs().toISOString()).optional(),
  eventStartAfter: z.string().default(dayjs().toISOString()).optional(),
  includeCounts: z.boolean().default(false).optional(),
  offset: z.number().default(0).optional(),
  size: z.number().default(5).optional(),
});
export type GetEventsRequest = typeof GetEventsRequestParser._type;
export type GetEventsResponse = Page<
  Event & {
    attendees: number;
    options: number;
  }
>;

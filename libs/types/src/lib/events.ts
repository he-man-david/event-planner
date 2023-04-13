import { Event, EventMember, EventOption } from '@prisma/client';
import { EventOptionBodyParser } from './eventOptions';
import {
  Page,
  UUID,
  EventWithAttendeesAndOptionCounts,
  EventWithMembersAndOptionData,
} from './common';
import { z } from 'zod';
import dayjs = require('dayjs');

export type EventResponse = Event & {
  members: EventMember[];
  options: EventOption[];
};

// GET event
export const GetEventRequestParser = UUID;
export type GetEventRequest = typeof GetEventRequestParser._type;
export type GetEventResponse = EventWithMembersAndOptionData | null;

// CREATE event
const IsoDateTimeParser = z.preprocess(
  (arg) => dayjs(String(arg)).toISOString(),
  z.string().datetime()
);

export const CreateEventRequestParser = z
  .object({
    title: z.string(),
    eventStart: IsoDateTimeParser.default(dayjs().day(7).toISOString()),
    eventEnd: IsoDateTimeParser.default(dayjs().day(14).toISOString()),
    createdBy: z.string(), // Stytch user-id here is not uuid - user-test-1975b99d-63fd-48ac-93ce-4ebe9bea5a81
    options: z.array(EventOptionBodyParser).optional(),
  })
  .refine(
    ({ eventStart, eventEnd }) =>
      eventStart && eventEnd && eventStart < eventEnd,
    {
      message:
        "Event Start and Event End dates are invalid! They can't be empty and start must be less than end.",
    }
  );
export type CreateEventRequest = typeof CreateEventRequestParser._input;

// GET events
export const GetEventsRequestParser = z.object({
  eventStartBefore: z.string().optional(),
  eventStartAfter: z.string().optional(),
  includeCounts: z.preprocess(Boolean, z.boolean()).default(false).optional(),
  offset: z.preprocess(Number, z.number()).default(0).optional(),
  size: z.preprocess(Number, z.number()).default(5).optional(),
});
export type GetEventsRequest = typeof GetEventsRequestParser._type;
export type GetEventsResponse = Page<EventWithAttendeesAndOptionCounts>;

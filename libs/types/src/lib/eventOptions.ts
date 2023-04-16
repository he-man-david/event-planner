import { EventOption } from '@prisma/client';
import { UUID, Page } from './common';
import { z } from 'zod';

// Event Option body
export const EventOptionBodyParser = z.object({
  title: z.string(),
  description: z.string().nullable(),
  linkUrl: z.string(),
  linkPreviewTitle: z.string().nullable(),
  linkPreviewDesc: z.string().nullable(),
  linkPreviewImgUrl: z.string().nullable(),
});
export type EventOptionBody = typeof EventOptionBodyParser._type;

export type EventOptionBodyWithVotes = EventOption & {
  votes?: number;
  voted?: boolean;
};

// GET Event Option
export const GetEventOptionsQueryParser = z.object({
  eventId: UUID,
  offset: z.number(),
  limit: z.number(),
});
export type GetEventOptionsRequest = typeof GetEventOptionsQueryParser._type;
export type GetEventOptionsResponse = Page<EventOptionBodyWithVotes>;

// CREATE Event Option
export const CreateEventOptionRequestParser = z.object({
  eventId: UUID,
  option: EventOptionBodyParser,
});
export type CreateEventOptionRequest =
  typeof CreateEventOptionRequestParser._type;
export type CreateEventOptionResponse = EventOption &
  {
    votes?: number;
    voted?: boolean;
  }[];

// DELETE Event Option
export const DeleteEventOptionRequestParser = z.object({
  eventOptionId: UUID,
});
export type DeleteEventOptionRequest =
  typeof DeleteEventOptionRequestParser._type;
export type DeleteEventOptionResponse = boolean;

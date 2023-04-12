import { EventOption as _EventOption } from '@prisma/client';
import { LinkPreviewParam, LinkPreviewParamType, UUID, Page } from './common';
import { z } from 'zod';

type EventOptionWithVoteCounts = EventOption & { votes: number };

export const GetEventOptionsQueryParser = z.object({
  eventId: UUID,
  offset: z.number(),
  limit: z.number(),
});
export type GetEventOptionsRequest = typeof GetEventOptionsQueryParser._type;
export type GetEventOptionsResponse = Page<EventOptionWithVoteCounts>;

export const EventOptionBodyParser = z.object({
  title: z.string(),
  description: z.string().optional(),
  linkPreview: LinkPreviewParam,
});
export type EventOptionBody = typeof EventOptionBodyParser._type;
export type EventOption = _EventOption & {
  linkPreview: LinkPreviewParamType;
  votes?: number;
  voted?: boolean;
};

export const CreateEventOptionsRequestParser = z.object({
  eventId: UUID,
  options: z.array(EventOptionBodyParser),
});
export type CreateEventOptionResponse = EventOption[];

export const DeleteEventOptionRequestParser = z.object({
  eventOptionId: UUID,
});
export type DeleteEventOptionRequest =
  typeof DeleteEventOptionRequestParser._type;
export type DeleteEventOptionResponse = boolean;

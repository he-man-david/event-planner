import { EventComment } from '@prisma/client';
import { UUID, Page } from './common';
import { z } from 'zod';

export const GetEventCommentsRequestParser = z.object({
  eventId: UUID,
  offset: z.number(),
  limit: z.number(),
});
export type GetEventCommentsRequest =
  typeof GetEventCommentsRequestParser._type;
export type GetEventCommentsResponse = Page<EventComment>;

export const CreateEventCommentRequestParser = z.object({
  createdBy: UUID,
  content: z.string(),
  eventId: UUID,
});
export type CreateEventCommentRequest =
  typeof CreateEventCommentRequestParser._type;
export type CreateEventCommentResponse = EventComment;

import { EventComment, User } from '@prisma/client';
import { UUID, Page } from './common';
import { z } from 'zod';

export type EventCommentWithCommenterInfo = EventComment & {
  commenterInfo: User
};

//GET Event Comments
export const GetEventCommentsRequestParser = z.object({
  eventId: UUID,
  offset: z.preprocess(Number, z.number()).default(0),
  limit: z.preprocess(Number, z.number()).default(3),
});
export type GetEventCommentsRequest =
  typeof GetEventCommentsRequestParser._type;
export type GetEventCommentsResponse = Page<EventCommentWithCommenterInfo>;

//CREATE Event Comments
export const CreateEventCommentRequestParser = z.object({
  createdBy: z.string(),
  content: z.string(),
  eventId: UUID,
});
export type CreateEventCommentRequest =
  typeof CreateEventCommentRequestParser._type;
export type CreateEventCommentResponse = EventCommentWithCommenterInfo;

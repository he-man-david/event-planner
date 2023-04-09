import { EventMember } from '@prisma/client';
import { z } from 'zod';
import { Page, UUID } from './common';

export const GetEventMembersRequestParser = z.object({
  eventId: UUID,
  offset: z.number(),
  limit: z.number(),
});
export type GetEventMembersRequest = typeof GetEventMembersRequestParser._type;
export type GetEventMembersResponse = Page<EventMember>;

export const CreateEventMemberRequestParser = z.object({
  userId: UUID,
  eventId: UUID,
});
export type CreateEventMemberRequest =
  typeof CreateEventMemberRequestParser._type;
export type CreateEventMemberResponse = EventMember | null;

export const DeleteEventMembersRequestParser = z.object({
  eventMemberIds: z.array(UUID),
});
export type DeleteEventMembersRequest =
  typeof DeleteEventMembersRequestParser._type;
export type DeleteEventMembersResponse = number;

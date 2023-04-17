import { EventMember, User } from '@prisma/client';
import { z } from 'zod';
import { Page, UUID } from './common';

export type EventMemberWithMemberInfo = EventMember & {
  memberInfo: User
};

// GET Event Members
export const GetEventMembersRequestParser = z.object({
  eventId: UUID,
  offset:  z.preprocess(Number, z.number()),
  limit:  z.preprocess(Number, z.number()),
});
export type GetEventMembersRequest = typeof GetEventMembersRequestParser._type;
export type GetEventMembersResponse = Page<EventMemberWithMemberInfo>;

// CREATE Event Members
export const CreateEventMemberRequestParser = z.object({
  userId: UUID,
  eventId: UUID,
});
export type CreateEventMemberRequest =
  typeof CreateEventMemberRequestParser._type;
export type CreateEventMemberResponse = EventMemberWithMemberInfo | null;

// DELETE Event Members
export const DeleteEventMembersRequestParser = z.object({
  eventMemberIds: z.array(UUID),
});
export type DeleteEventMembersRequest =
  typeof DeleteEventMembersRequestParser._type;
export type DeleteEventMembersResponse = number;

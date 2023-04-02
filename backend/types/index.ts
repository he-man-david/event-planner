import { EventComment, EventMember, EventOption } from "@prisma/client";
import { z } from "zod";

export const UUID = z.string().uuid();

// *** common/helper definitions
export type EventWithAttendeesAndOptionData = Event & {
  attendees: EventMember[];
  options: EventOption[];
};

export type EventWithAttendeesAndOptionCounts = Event & {
  attendees: number;
  options: number;
};

export type EventOptionWithVoteCounts = EventOption & { votes: number };

export const CommonGetByEventIdQuery = z.object({
  eventId: UUID,
  offset: z.number(),
  limit: z.number(),
});

export const CommonCreateEventOption = z.object({
  title: z.string(),
  description: z.string().optional(),
  link: z.string(),
});

export type Page<T> = {
  content: T[];
  pageInfo: {
    offset: number;
    size: number;
    hasNext: boolean;
    totalCount: number;
  };
};

// *** EventOptions API types
export const GetEventOptionsRequestQuery = CommonGetByEventIdQuery;
export type GetEventOptionsQueryResponse = Page<EventOptionWithVoteCounts>;

export const PostEventOptionRequestBody = z.object({
  eventId: UUID,
  options: z.array(CommonCreateEventOption),
});
export type PostEventOptionResponse = EventOption[];

export const DeleteEventOptionRequestBody = z.object({
  eventOptionId: UUID,
});
export type DeleteEventOptionResponse = boolean;

// *** Events API types
export type GetEventResponse = EventWithAttendeesAndOptionData;

export const PostEventRequestBody = z.object({
  title: z.string(),
  eventStart: z.date().optional(),
  createdBy: z.string().uuid(),
  options: z.array(CommonCreateEventOption).optional(),
});
export type PostEventResponse = Event & {
  attendees: EventMember[];
  options: EventOption[];
};

export const GetMultipleEventsRequestBody = z.object({
  eventStartBefore: z.date().default(new Date()).optional(),
  eventStartAfter: z.date().default(new Date()).optional(),
  includeCounts: z.boolean().default(false).optional(),
  offset: z.number().default(0).optional(),
  size: z.number().default(5).optional(),
});
export type GetMultipleEventsResponse = Page<EventWithAttendeesAndOptionCounts>;

// *** EventMemeber API types
export const GetMultipleEventMembersRequestQuery = CommonGetByEventIdQuery;
export type GetMultipleEventMembersResponse = Page<EventMember>;

export const PostEventMemberRequestBody = z.object({
  userId: UUID,
  eventId: UUID,
});
export type PostEventMemberResponse = EventMember | null;

export const DeleteManyEventMembersRequestBody = z.object({
  eventMemberIds: z.array(UUID),
});
export type DeleteManyEventMembersResponse = number;

// *** EventComment API types
export const GetMultipleEventCommentsRequestQuery = CommonGetByEventIdQuery;
export type GetMultipleEventCommentsResponse = Page<EventComment>;

export const PostEventCommentRequestBody = z.object({
  createdBy: UUID,
  content: z.string(),
  eventId: UUID,
});
export type PostEventCommentResponse = EventComment;

// *** EventOptionVote API types
export const PostEventOptionVoteRequestBody = z.object({
  eventOptionId: UUID,
  eventMemberId: UUID,
});

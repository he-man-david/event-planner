import { Event, EventComment, EventMember, EventOption } from "@prisma/client";
import { z } from "zod";
import dayjs from "dayjs";

export const UUID = z.string().uuid();

export const DayJsObjFromUnix = z.custom<dayjs.Dayjs>((val) =>
  dayjs.unix(Number(val))
);

// *** common/helper definitions
export type EventWithAttendeesAndOptionData = Event & {
  attendees: EventMember[];
  options: EventOptionWithVoteCounts[];
};

export type EventWithAttendeesAndOptionCounts = Event & {
  attendees: number;
  options: number;
};

export type EventOptionWithVoteCounts = EventOption & { votes: number };

export const CommonGetByEventIdQueryParser = z.object({
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

// *** Events API types
export type GetEventResponse = EventWithAttendeesAndOptionData | null;

export const PostEventRequestBodyParser = z.object({
  title: z.string(),
  eventStart: z.string(),
  eventEnd: z.string(),
  createdBy: z.string(), // Stytch user-id here is not uuid - user-test-1975b99d-63fd-48ac-93ce-4ebe9bea5a81
  options: z.array(CommonCreateEventOption).optional(),
});
export type EventResponse = Event & {
  attendees: EventMember[];
  options: EventOption[];
};

export const GetMultipleEventsRequestBody = z.object({
  eventStartBefore: z.string().default(dayjs().toISOString()).optional(),
  eventStartAfter: z.string().default(dayjs().toISOString()).optional(),
  includeCounts: z.boolean().default(false).optional(),
  offset: z.number().default(0).optional(),
  size: z.number().default(5).optional(),
});
export type GetMultipleEventsRequest =
  typeof GetMultipleEventMembersRequestQuery._type;
export type GetMultipleEventsResponse = Page<EventWithAttendeesAndOptionCounts>;

// ***** EventOptions API types *****
export const GetEventOptionsQueryParser = CommonGetByEventIdQueryParser;
export type GetEventOptionsRequest = typeof GetEventOptionsQueryParser._type;
export type GetEventOptionsResponse = Page<EventOptionWithVoteCounts>;

export const PostEventOptionRequestBody = z.object({
  eventId: UUID,
  options: z.array(CommonCreateEventOption),
});
export type PostEventOptionResponse = EventOption[];

export const DeleteEventOptionRequestBody = z.object({
  eventOptionId: UUID,
});
export type DeleteEventOptionResponse = boolean;

// *** EventMemeber API types
export const GetMultipleEventMembersRequestQuery =
  CommonGetByEventIdQueryParser;
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
export const GetMultipleEventCommentsRequestQuery =
  CommonGetByEventIdQueryParser;
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

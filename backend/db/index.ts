import { Event, EventMember, EventOption, PrismaClient } from "@prisma/client";
import {
  PostEventRequestBody,
  PostEventMemberRequestBody,
  UUID,
  DeleteManyEventMembersRequestBody,
  PostEventOptionRequestBody,
  DeleteEventOptionRequestBody,
  PostEventCommentRequestBody,
  PostEventOptionVoteRequestBody,
} from "../types";

const prisma = new PrismaClient();

export type EventWithAttendeesAndOption = Event & {
  attendees: EventMember[];
  options: EventOption[];
};

const getEventOptionVotes = async (eventOptionId: typeof UUID._type) => {
  return await prisma.eventOptionVote.findMany({
    where: { eventOptionId: eventOptionId },
  });
};

const toggleEventOptionVote = async (
  data: typeof PostEventOptionVoteRequestBody._type
) => {
  try {
    return await prisma.eventOptionVote.delete({
      where: {
        eventOptionId_eventMemberId: data,
      },
    });
  } catch (e) {
    return await prisma.eventOptionVote.create({ data });
  }
};

const addEventComment = async (
  data: typeof PostEventCommentRequestBody._type
) => {
  return await prisma.eventComment.create({ data });
};

const getEventComments = async (eventId: typeof UUID._type) => {
  return await prisma.eventComment.findMany({
    where: {
      eventId,
    },
    take: 10, // TODO - pass these in
  });
};

const getEventMembers = async (eventId: typeof UUID._type) => {
  return await prisma.eventMember.findMany({ where: { eventId } });
};

const addUserToEvent = async (
  data: typeof PostEventMemberRequestBody._type
): Promise<EventMember | null> => {
  return await prisma.eventMember.create({ data });
};

const removeUsersFromEvent = async (
  eventMemberIds: Array<typeof UUID._type>
) => {
  const result = await prisma.eventMember.deleteMany({
    where: {
      id: {
        in: eventMemberIds,
      },
    },
  });
  return result.count;
};

const getEventOptions = async (eventId: typeof UUID._type) => {
  return await prisma.eventOption.findMany({ where: { eventId }, take: 20 });
};

const createEventOptions = async (
  req: typeof PostEventOptionRequestBody._type
) => {
  const optionsData =
    req.options.map((opt) => {
      return {
        eventId: req.eventId,
        title: opt.title,
        description: opt.description,
        linkPreview: { link: opt.link },
      };
    }) || [];
  return await prisma.eventOption.createMany({ data: optionsData });
};

const deleteEventOption = async (
  req: typeof DeleteEventOptionRequestBody._type
) => {
  return await prisma.eventOption.delete({ where: { id: req.eventOptionId } });
};

const getEvent = async (
  eventId: typeof UUID._type
): Promise<EventWithAttendeesAndOption | null> => {
  return await prisma.event.findFirst({
    where: {
      id: eventId,
    },
    include: {
      attendees: {
        skip: 0,
        take: 10,
      },
      options: {
        skip: 0,
        take: 10,
      },
    },
  });
};

const createEvent = async (
  req: typeof PostEventRequestBody._type
): Promise<EventWithAttendeesAndOption | null> => {
  const event = await prisma.event.create({
    data: {
      title: req.title,
      createdBy: req.createdBy,
    },
  });
  const optionsData =
    req.options?.map((opt) => {
      return {
        eventId: event.id,
        title: opt.title,
        description: opt.description,
        linkPreview: { link: opt.link },
      };
    }) || [];
  await prisma.eventOption.createMany({ data: optionsData });

  await addUserToEvent({ userId: req.createdBy, eventId: event.id });

  return getEvent(event.id);
};

export default {
  createEvent,
  getEvent,
  addUserToEvent,
  removeUsersFromEvent,
  getEventOptions,
  createEventOptions,
  deleteEventOption,
  addEventComment,
  getEventComments,
  toggleEventOptionVote,
  getEventOptionVotes,
  getEventMembers,
};

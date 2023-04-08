import { EventMember, PrismaClient } from '@prisma/client';
import {
  PostEventRequestBodyParser,
  PostEventMemberRequestBody,
  UUID,
  DeleteManyEventMembersRequestBody,
  PostEventOptionRequestBody,
  DeleteEventOptionRequestBody,
  PostEventCommentRequestBody,
  PostEventOptionVoteRequestBody,
  Page,
  EventWithAttendeesAndOptionCounts,
  GetEventOptionsRequest,
  EventOptionWithVoteCounts,
  GetMultipleEventCommentsRequestQuery,
  GetMultipleEventMembersRequestQuery,
  EventWithAttendeesAndOptionData,
  GetMultipleEventsRequestBody,
  EventResponse,
} from 'libs/types/src';
import * as dayjs from 'dayjs';

const prisma = new PrismaClient();

export const createPage = <T>(
  totalCount: number,
  offset: number,
  content: T[]
): Page<T> => {
  const size = content.length;
  const hasNext = totalCount - (offset + size) > 0;
  return {
    content,
    pageInfo: {
      size,
      offset,
      totalCount,
      hasNext,
    },
  };
};

export const getEventOptionVotes = async (eventOptionId: typeof UUID._type) => {
  return await prisma.eventOptionVote.findMany({
    where: { eventOptionId: eventOptionId },
  });
};

export const toggleEventOptionVote = async (
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

export const addEventComment = async (
  data: typeof PostEventCommentRequestBody._type
) => {
  return await prisma.eventComment.create({ data });
};

export const getEventComments = async (
  req: typeof GetMultipleEventCommentsRequestQuery._type
) => {
  const offset = req.offset;
  const where = {
    eventId: req.eventId,
  };
  const totalCount = await prisma.eventComment.count({ where });
  const content = await prisma.eventComment.findMany({
    where,
    skip: offset,
    take: req.limit,
  });
  return createPage(totalCount, offset, content);
};

export const getEventMembers = async (
  req: typeof GetMultipleEventMembersRequestQuery._type
) => {
  const offset = req.offset;
  const where = {
    eventId: req.eventId,
  };
  const totalCount = await prisma.eventMember.count({ where });
  const content = await prisma.eventMember.findMany({
    where,
    take: req.limit,
    skip: offset,
  });
  return createPage(totalCount, offset, content);
};

export const addUserToEvent = async (
  data: typeof PostEventMemberRequestBody._type
): Promise<EventMember | null> => {
  return await prisma.eventMember.create({ data });
};

export const removeUsersFromEvent = async (
  req: typeof DeleteManyEventMembersRequestBody._type
) => {
  const result = await prisma.eventMember.deleteMany({
    where: {
      id: {
        in: req.eventMemberIds,
      },
    },
  });
  return result.count;
};

export const getEventOptions = async (
  req: GetEventOptionsRequest
): Promise<Page<EventOptionWithVoteCounts>> => {
  const offset = req.offset;
  const where = { eventId: req.eventId };

  const totalCount = await prisma.eventOption.count({ where });
  const content = await prisma.eventOption.findMany({
    where,
    take: req.limit,
    skip: offset,
    include: {
      _count: {
        select: {
          eventOptionVote: true,
        },
      },
    },
  });
  const mappedContent = content.map((row) => {
    const { _count, ...event } = row;
    return { ...event, votes: _count.eventOptionVote };
  });
  return createPage(totalCount, offset, mappedContent);
};

export const createEventOptions = async (
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

export const deleteEventOption = async (
  req: typeof DeleteEventOptionRequestBody._type
) => {
  return await prisma.eventOption.delete({ where: { id: req.eventOptionId } });
};

export const getEvent = async (
  eventId: typeof UUID._type
): Promise<EventWithAttendeesAndOptionData | null> => {
  const event = await prisma.event.findFirst({
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
        include: {
          _count: {
            select: {
              eventOptionVote: true,
            },
          },
        },
      },
    },
  });

  if (!event) {
    return null;
  }

  const { options, ...rest } = event;
  const mappedOptions = options.map((opt) => {
    const { _count, ...rest } = opt;
    return { votes: _count.eventOptionVote, ...rest };
  });
  return { ...rest, options: mappedOptions };
};

export const getMultipleEvent = async (
  req: typeof GetMultipleEventsRequestBody._type
): Promise<Page<EventWithAttendeesAndOptionCounts>> => {
  const offset = req.offset ?? 0;
  const where = {
    eventStart: {
      gte: req.eventStartAfter
        ? dayjs(req.eventStartAfter).toISOString()
        : undefined,
      lte: req.eventStartBefore
        ? dayjs(req.eventStartBefore).toISOString()
        : undefined,
    },
  };
  const totalCount = await prisma.event.count({ where });
  const content = await prisma.event.findMany({
    where,
    skip: offset,
    take: req.size,
    include: { _count: { select: { attendees: true, options: true } } },
  });

  const mappedContent = content.map((row) => {
    const { _count, ...event } = row;
    return { ...event, attendees: _count.attendees, options: _count.options };
  });
  return createPage(totalCount, offset, mappedContent);
};

export const createEvent = async (
  req: typeof PostEventRequestBodyParser._type
): Promise<EventResponse | null> => {
  const event = await prisma.event.create({
    data: {
      title: req.title,
      createdBy: req.createdBy,
      eventStart: dayjs(req.eventStart).toISOString(),
      eventEnd: dayjs(req.eventEnd).toISOString(),
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

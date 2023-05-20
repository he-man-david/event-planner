// TODO - Split into individual files!

import { PrismaClient, User } from '@prisma/client';
import {
  UUID,
  Page,
  GetEventOptionsRequest,
  EventResponse,
  GetEventsResponse,
  GetEventOptionsResponse,
  CreateEventOptionRequest,
  DeleteEventMembersRequest,
  CreateEventMemberRequest,
  DeleteEventOptionRequest,
  CreateEventCommentRequest,
  CreateEventRequest,
  ToogleEventOptionVoteRequest,
  GetEventCommentsRequest,
  GetEventCommentsResponse,
  GetEventMembersRequest,
  GetEventsRequest,
  UpdateEventRequest,
  UpdateEventOptionRequest,
  UpdateUserRequest,
  GetEventMembersResponse,
  CreateEventCommentResponse,
  CreateEventMemberResponse,
} from '@event-planner/types';
import dayjs = require('dayjs');

const DEFAULT_TAKE = 3;

const EMPTY_PAGE = {
  content: [],
  pageInfo: {
    size:0,
    offset: 0,
    totalCount: 0,
    hasNext: false,

  }
}

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
  data: ToogleEventOptionVoteRequest
) => {
  // TODO (Jaser): Is below considered a normal pattern? aka "good code"
  try {
    await prisma.eventOptionVote.delete({
      where: {
        eventOptionId_userId: data,
      },
    });
    return false;
  } catch (e) {
    await prisma.eventOptionVote.create({ data });
    return true;
  }
};

export const addEventComment = async (
  data: CreateEventCommentRequest
): Promise<CreateEventCommentResponse> => {
  return await prisma.eventComment.create({
    data,
    include: { commenterInfo: true },
  });
};

export const getEventComments = async (
  req: GetEventCommentsRequest
): Promise<GetEventCommentsResponse> => {
  const offset = req.offset;
  const where = {
    eventId: req.eventId,
  };
  const totalCount = await prisma.eventComment.count({ where });
  const content = await prisma.eventComment.findMany({
    where,
    skip: offset,
    take: req.limit,
    include: {
      commenterInfo: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  return createPage(totalCount, offset, content);
};

export const getEventMembers = async (
  req: GetEventMembersRequest
): Promise<GetEventMembersResponse> => {
  const offset = req.offset;
  const where = {
    eventId: req.eventId,
  };
  const totalCount = await prisma.eventMember.count({ where });
  const content = await prisma.eventMember.findMany({
    where,
    take: req.limit,
    skip: offset,
    include: {
      memberInfo: true,
    },
  });
  return createPage(totalCount, offset, content);
};

export const addUserToEvent = async (
  data: CreateEventMemberRequest
): Promise<CreateEventMemberResponse> => {
  const existingEventMember = await prisma.eventMember.findFirst(
    {
      where: {
        ...data
      },
      include: {
        memberInfo: true
      }
    }
  );
  if (existingEventMember) {
    return existingEventMember;
  }
  return await prisma.eventMember.create({
    data,
    include: { memberInfo: true },
  });
};

export const removeUsersFromEvent = async (req: DeleteEventMembersRequest) => {
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
): Promise<GetEventOptionsResponse> => {
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
    const { _count, ...eventOption } = row;

    return { ...eventOption, votes: _count.eventOptionVote };
  });
  return createPage(totalCount, offset, mappedContent);
};

export const createEventOption = async (req: CreateEventOptionRequest) => {
  const optionData = {
    eventId: req.eventId,
    ...req.option,
  };
  return await prisma.eventOption.create({ data: optionData });
};
export const getEventOption = async (id: string) => {
  const content = await prisma.eventOption.findFirst({
    where: { id },
    include: {
      _count: {
        select: {
          eventOptionVote: true,
        },
      },
    },
  });
  if (!content) {
    return null;
  }
  const { _count, ...eventOption } = content;
  return { ...eventOption, votes: _count.eventOptionVote };
};

export const updateEventOption = async (
  id: string,
  data: UpdateEventOptionRequest
) => {
  const result = await prisma.eventOption.update({
    where: { id },
    select: { id: true },
    data,
  });
  return getEventOption(result.id);
};

export const deleteEventOption = async (req: DeleteEventOptionRequest) => {
  return await prisma.eventOption.delete({ where: { id: req.eventOptionId } });
};

export const getEvent = async (
  eventId: typeof UUID._type,
  userId?: string,
): Promise<EventResponse> => {
  const commonQuery = { take: DEFAULT_TAKE, skip: 0 };
  const event = await prisma.event.findFirst({
    where: {
      id: eventId,
    },
    include: {
      _count: {
        select: {
          options: true,
          members: true,
          comments: true,
        },
      },
      members: { ...commonQuery, 
        include: {
          memberInfo: true,
        }
      },
      comments: { ...commonQuery, 
        include: {
          commenterInfo: true,
        },
        orderBy: {
          createdAt: 'desc'
        }
      },
      options: {
        ...commonQuery,
        include: {
          _count: {
            select: {
              eventOptionVote: true,
            },
          },
          eventOptionVote: {
            where: { userId: userId },
          },
        },
      },
    },
  });

  if (!event) {
    return null;
  }
  if (userId) {
    await addUserToEvent({userId, eventId: event.id});
  }
  const { options, _count, members, comments, ...rest } = event;
  const mappedOptions = options.map((opt) => {
    const { _count, eventOptionVote, ...rest } = opt;
    const voted = !!userId && eventOptionVote.length > 0;
    return { votes: _count.eventOptionVote, voted, ...rest };
  });
  return {
    ...rest,
    options: createPage(_count.options, commonQuery.skip, mappedOptions),
    members: createPage(_count.members, commonQuery.skip, members),
    comments: createPage(_count.comments, commonQuery.skip, comments),
  };
};

export const deleteEvent = async (
  eventId: typeof UUID._type
): Promise<boolean> => {
  await prisma.event.delete({
    where: {
      id: eventId,
    },
  });

  return true;
};

export const getEventsForUser = async (
  req: GetEventsRequest,
  userId?: string
): Promise<GetEventsResponse> => {
  if (!userId) {
    return EMPTY_PAGE
  }
  const offset = req.offset ?? 0;
  const eventWhereFilter = {
    eventStart: {
      gte: req.eventStartAfter
        ? dayjs(req.eventStartAfter).toISOString()
        : undefined,
      lte: req.eventStartBefore
        ? dayjs(req.eventStartBefore).toISOString()
        : undefined,
    },
  };

  const totalCount = await prisma.event.count({
    where: {
      ...eventWhereFilter,
      members: {
        some: {
          userId: userId,
        },
      },
    },
  });

  const result = await prisma.event.findMany({
    where: {
      ...eventWhereFilter,
      members: {
        some: {
          userId: userId,
        },
      },
    },
    include: {
      _count: { select: { members: true, options: true } },
    },
  });

  const mappedContent = result.map((row) => {
    const { _count, ...event } = row;
    return { ...event, members: _count.members, options: _count.options };
  });
  return createPage(totalCount, offset, mappedContent);
};

export const createEvent = async (
  req: CreateEventRequest
): Promise<EventResponse> => {
  const event = await prisma.event.create({
    select: {
      id: true,
    },
    data: {
      title: req.title,
      description: req.description,
      createdBy: req.createdBy,
      eventStart: dayjs(req.eventStart).toISOString(),
      eventEnd: dayjs(req.eventEnd).toISOString(),
    },
  });
  const optionsData =
    req.options?.map((opt) => {
      return {
        eventId: event.id,
        ...opt,
      };
    }) || [];
  await prisma.eventOption.createMany({ data: optionsData });

  await addUserToEvent({ userId: req.createdBy, eventId: event.id });

  return getEvent(event.id, req.createdBy);
};

export const getEventMember = async (userId: string, eventId: string) => {
  return await prisma.eventMember.findFirst({
    where: {
      eventId,
      userId,
    },
  });
};

export const updateEvent = async (
  id: string,
  data: UpdateEventRequest
): Promise<EventResponse> => {
  const result = await prisma.event.update({
    where: {
      id,
    },
    select: {
      id: true,
    },
    data,
  });
  return getEvent(result.id);
};

export const updateUser = async (data: UpdateUserRequest): Promise<User> => {
  // upsert is same as update or create
  return await prisma.user.upsert({
    where: {
      id: data.id,
    },
    update: data,
    create: data,
  });
};

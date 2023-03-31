import {
  Event,
  EventAttendee,
  EventOption,
  PrismaClient,
} from "../../../../db/prisma";
import {
  CreateEventRequest,
  AddUserToEventRequest,
  UUID,
  RemoveUsersFromEventRequest,
  CreateEventOption,
  CreateEventOptionRequest,
  DeleteEventOptionRequest,
} from "../types";

const prisma = new PrismaClient();

type EventWithAttendeesAndOption = Event & {
  attendees: EventAttendee[];
  options: EventOption[];
};

const addUserToEvent = async (
  data: typeof AddUserToEventRequest._type
): Promise<EventAttendee | null> => {
  return await prisma.eventAttendee.create({ data });
};

const removeUsersFromEvent = async (
  req: typeof RemoveUsersFromEventRequest._type
) => {
  const result = await prisma.eventAttendee.deleteMany({
    where: {
      userId: {
        in: req.userIds,
      },
    },
  });
  return result.count;
};

const createEventOptions = async (
  req: typeof CreateEventOptionRequest._type
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
  req: typeof DeleteEventOptionRequest._type
) => {
  return await prisma.eventOption.delete({where: {id: req.eventOptionId }});
}

const getEvent = async (
  eventId: typeof UUID._type
): Promise<EventWithAttendeesAndOption | null> => {
  return await prisma.event.findFirst({
    where: {
      id: eventId,
    },
    include: {
      attendees: true,
      options: true,
    },
  });
};

const createEvent = async (
  req: typeof CreateEventRequest._type
): Promise<EventWithAttendeesAndOption | null> => {
  const event = await prisma.event.create({
    data: {
      title: req.title,
      createdBy: req.createdBy,
    },
  });

  await createEventOptions({ eventId: event.id, options: req.options || [] });

  return getEvent(event.id);
};

export default {
  createEvent,
  getEvent,
  addUserToEvent,
  removeUsersFromEvent,
  createEventOptions,
  deleteEventOption
};

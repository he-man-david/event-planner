import {
  Event,
  EventAttendee,
  EventOption,
  PrismaClient,
} from "../../../db/prisma";
import { CreateEventRequest, UUID } from "../types";

const prisma = new PrismaClient();

type EventWithAttendeesAndOption = Event & {
  attendees: EventAttendee[];
  options: EventOption[];
};

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

const saveEvent = async (
  req: typeof CreateEventRequest._type
): Promise<EventWithAttendeesAndOption | null> => {
  const event = await prisma.event.create({
    data: {
      title: req.title,
      createdBy: req.createdBy,
    },
  });

  const attendeeData =
    req.attendees?.map((uid) => {
      return { userId: uid, eventId: event.id };
    }) || [];
  await prisma.eventAttendee.createMany({ data: attendeeData });

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

  return getEvent(event.id);
};

export default {
  saveEvent,
  getEvent,
};

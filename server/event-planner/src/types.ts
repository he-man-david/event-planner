import { z } from "zod";

export const UUID = z.string().uuid();

export const CreateEventOptionRequest = z.object({
  title: z.string(),
  description: z.string().optional(),
  link: z.string(),
});

export const CreateEventRequest = z.object({
  title: z.string(),
  eventStart: z.date().optional(),
  createdBy: z.string().uuid(),
  options: z.array(CreateEventOptionRequest).optional(),
  attendees: z.array(UUID).optional(),
});

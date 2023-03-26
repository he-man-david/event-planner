import { z } from "zod";

export const CreateEventRequest = z.object({
  title: z.string(),
  eventStart: z.date(),
  createdBy: z.string().uuid(),
  eventOptions: z.array(z.object({})),
});

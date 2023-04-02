import { z } from "zod";

export const UUID = z.string().uuid();

export const CreateEventOption = z.object({
  title: z.string(),
  description: z.string().optional(),
  link: z.string(),
});

export const CreateEventOptionRequest = z.object({
  eventId: UUID,
  options: z.array(CreateEventOption),
});

export const DeleteEventOptionRequest = z.object({
  eventOptionId: UUID,
});

export const CreateEventRequest = z.object({
  title: z.string(),
  eventStart: z.date().optional(),
  createdBy: z.string().uuid(),
  options: z.array(CreateEventOption).optional(),
});

export const AddUserToEventRequest = z.object({
  userId: UUID,
  eventId: UUID,
});

export const RemoveUsersFromEventRequest = z.array(UUID);

export const AddEventCommentRequest = z.object({
  createdBy: UUID,
  content: z.string(),
  eventId: UUID,
});

export const ToggleEventOptionVoteRequest = z.object({
  eventOptionId: UUID,
  eventMemberId: UUID,
});
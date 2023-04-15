import { EventOption } from '@prisma/client';
import { UUID, Page } from './common';
import { z } from 'zod';

// GET Event Option
export const GetEventOptionsQueryParser = z.object({
  eventId: UUID,
  offset: z.number(),
  limit: z.number(),
});
export type GetEventOptionsRequest = typeof GetEventOptionsQueryParser._type;
export type GetEventOptionsResponse = Page<
  EventOption & {
    votes?: number;
    voted?: boolean;
  }
>;

// CREATE Event Option
export const CreateEventOptionsRequestParser = z.object({
  eventId: UUID,
  options: z.array(
    z.object({
      title: z.string(),
      description: z.string().optional(),
      linkUrl: z.string(),
      linkPreviewTitle: z.string().optional(),
      linkPreviewDesc: z.string().optional(),
      linkPreviewImgUrl: z.string().optional(),
    })
  ),
});
export type CreateEventOptionsRequest =
  typeof CreateEventOptionsRequestParser._type;
export type CreateEventOptionResponse = EventOption &
  {
    votes?: number;
    voted?: boolean;
  }[];

// DELETE Event Option
export const DeleteEventOptionRequestParser = z.object({
  eventOptionId: UUID,
});
export type DeleteEventOptionRequest =
  typeof DeleteEventOptionRequestParser._type;
export type DeleteEventOptionResponse = boolean;

import { Event, EventMember, EventOption } from '@prisma/client';
import { z } from 'zod';

export const UUID = z.string().uuid();

export type EventWithMembersAndOptionData = Event & {
  members: EventMember[];
  options: EventOptionWithVoteCounts[];
};

export type EventWithAttendeesAndOptionCounts = Event & {
  members: number;
  options: number;
};

export type EventOptionWithVoteCounts = EventOption & { votes: number };

export const LinkPreviewParam = z.object({
  title: z.string().optional(),
  desc: z.string().optional(),
  link: z.string(),
  imageUrl: z.string().optional(),
});

export type LinkPreviewParamType = typeof LinkPreviewParam._type;

export type Page<T> = {
  content: T[];
  pageInfo: {
    offset: number;
    size: number;
    hasNext: boolean;
    totalCount: number;
  };
};

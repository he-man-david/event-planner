import { UUID } from './common';
import { z } from 'zod';

export const CreateEventOptionVoteRequestParser = z.object({
  eventOptionId: UUID,
  eventMemberId: UUID,
});

export type CreateEventOptionVoteRequest =
  typeof CreateEventOptionVoteRequestParser._type;

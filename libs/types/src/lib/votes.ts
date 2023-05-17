import { UUID } from './common';
import { z } from 'zod';

export const ToggleEventOptionVoteRequestParser = z.object({
  eventOptionId: UUID,
  eventMemberId: z.string(),
});

export type ToogleEventOptionVoteRequest =
  typeof ToggleEventOptionVoteRequestParser._type;

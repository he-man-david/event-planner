import { UUID } from './common';
import { z } from 'zod';

export const ToggleEventOptionVoteRequestParser = z.object({
  eventOptionId: UUID,
  eventMemberId: UUID,
});

export type ToogleEventOptionVoteRequest =
  typeof ToggleEventOptionVoteRequestParser._type;

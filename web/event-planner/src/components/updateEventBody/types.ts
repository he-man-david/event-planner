import { EventOption } from "types";

export interface UpdateEventBodyParam {
  voteOptions: EventOption[];
  setVoteOptions: (e: EventOption[]) => void;
  editVoteOptions: (p: number) => void;
  delVoteOptions: (p: number) => void;
}

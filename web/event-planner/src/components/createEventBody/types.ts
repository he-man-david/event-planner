import { EventOption } from "types";

export interface CreateEventBodyParam {
  voteOptions: EventOption[];
  setVoteOptions: (e: EventOption[]) => void;
  editMode: boolean;
  editVoteOptions: (p: number) => void;
  delVoteOptions: (p: number) => void;
}

import { LinkPreviewParam } from "components/linkPreview/types";

export interface EventOption {
  id: number;
  title: string;
  linkPreview: LinkPreviewParam;
  desc: string;
  votes?: number;
  voted?: boolean;
}

export interface EventBodyParam {
  voteOptions: EventOption[];
  setVoteOptions: (e: EventOption[]) => void;
  editMode?: boolean;
  editVoteOptions?: (p: number) => void;
  delVoteOptions?: (p: number) => void;
}

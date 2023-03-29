import { LinkPreviewParam } from "components/linkPreview/types";

export interface EventOption {
  id: number;
  title: string;
  linkPreview: LinkPreviewParam;
  desc: string;
  votes?: number;
  voted?: boolean;
}

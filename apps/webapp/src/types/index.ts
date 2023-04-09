import { LinkPreviewParamType } from '@event-planner/types/src';

export interface EventOption {
  id: number | string; // why number?
  title: string;
  linkPreview: LinkPreviewParamType;
  desc: string;
  votes?: number;
  voted?: boolean;
}

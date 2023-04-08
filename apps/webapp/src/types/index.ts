import { LinkPreviewParam } from 'components/linkPreview/types';

export interface EventOption {
  id: number | string; // why number?
  title: string;
  linkPreview: LinkPreviewParam;
  desc: string;
  votes?: number;
  voted?: boolean;
}

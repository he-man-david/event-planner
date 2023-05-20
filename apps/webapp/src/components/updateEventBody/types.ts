import { EventOptionBodyWithVotes, Page } from '@event-planner/types/src';

export interface UpdateEventBodyParam {
  optionsPage: Page<EventOptionBodyWithVotes>;
  setOptionsPage: (e: Page<EventOptionBodyWithVotes>) => void;
  editEventOptions: (p: number) => void;
  delEventOptions: (eventOptionId: string) => void;
}

import { EventOptionBodyWithVotes } from '@event-planner/types/src';

export interface UpdateEventBodyParam {
  eventOptions: EventOptionBodyWithVotes[];
  setEventOptions: (e: EventOptionBodyWithVotes[]) => void;
  editEventOptions: (p: number) => void;
  delEventOptions: (eventOptionId: string) => void;
}

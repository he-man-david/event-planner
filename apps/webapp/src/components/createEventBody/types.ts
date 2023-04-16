import { EventOptionBody } from '@event-planner/types/src';

export interface CreateEventBodyParam {
  eventOptions: EventOptionBody[];
  editEventOptions: (p: number) => void;
  delEventOptions: (p: number) => void;
}

export type EventListItm = {
  id: string;
  title: string;
  desc: string;
  startTime: string;
  endTime: string;
  memberCount: number;
  isInProgress: boolean;
};

export interface EventsListParam {
  data: EventListItm[];
}

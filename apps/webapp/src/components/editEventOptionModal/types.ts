import { EventOptionBody } from '@event-planner/types/src';

export interface EditEventOptionModalParam {
  open: boolean;
  setOpen: (t: boolean) => void;
  editOptionInfo?: EventOptionBody;
  createOption: (e: EventOptionBody) => void;
}

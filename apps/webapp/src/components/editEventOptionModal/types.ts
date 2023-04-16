import { EventOptionBody } from '@event-planner/types/src';

export interface EditEventOptionModalParam {
  open: boolean;
  setOpen: (t: boolean) => void;
  editOptionInfo: EventOptionBody | null;
  createOption: (e: EventOptionBody) => void;
  loading?: boolean;
}

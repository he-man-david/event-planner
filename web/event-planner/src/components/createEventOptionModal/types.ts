import { EventOption } from "components/eventBody/types";

export interface CreateEventOptionModalParam {
  open: boolean;
  editOptionInfo?: EventOption | null;
  setOpen: (t: boolean) => void;
  createOption: (e: EventOption) => void;
}

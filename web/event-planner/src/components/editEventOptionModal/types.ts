import { EventOption } from "types";

export interface EditEventOptionModalParam {
  open: boolean;
  editOptionInfo?: EventOption | null;
  setOpen: (t: boolean) => void;
  createOption: (e: EventOption) => void;
}

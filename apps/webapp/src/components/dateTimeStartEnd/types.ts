export interface DateTimeStartEndParam {
  startDate: Date;
  endDate: Date;
  handleUpdateSchedule: (s: Date, e: Date) => void;
  editable?: boolean;
}

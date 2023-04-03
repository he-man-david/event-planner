import dayjs from "dayjs";
import objectPlugin from "dayjs/plugin/toObject";
import isTodayPlugin from "dayjs/plugin/isToday";
import weekdayPlugin from "dayjs/plugin/weekday";
import updateLocale from "dayjs/plugin/updateLocale";

dayjs.extend(weekdayPlugin);
dayjs.extend(objectPlugin);
dayjs.extend(isTodayPlugin);
dayjs.extend(updateLocale);
dayjs.updateLocale("en", {
  months: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
});

export default dayjs;

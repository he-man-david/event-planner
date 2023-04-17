import * as dayjs from 'dayjs';
import objectPlugin from 'dayjs/plugin/toObject';
import isTodayPlugin from 'dayjs/plugin/isToday';
import weekdayPlugin from 'dayjs/plugin/weekday';
import updateLocale from 'dayjs/plugin/updateLocale';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(weekdayPlugin);
dayjs.extend(objectPlugin);
dayjs.extend(isTodayPlugin);
dayjs.extend(updateLocale);
dayjs.extend(utc);
dayjs.extend(timezone);

dayjs.updateLocale('en', {
  months: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
});

export default dayjs;

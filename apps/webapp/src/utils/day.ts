import dayjs from 'dayjs/esm/index.js';
import objectPlugin from 'dayjs/esm/plugin/toObject';
import isTodayPlugin from 'dayjs/esm/plugin/isToday';
import weekdayPlugin from 'dayjs/esm/plugin/weekday';
import updateLocale from 'dayjs/esm/plugin/updateLocale';
import utc from 'dayjs/esm/plugin/utc';
import timezone from 'dayjs/esm/plugin/timezone';

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

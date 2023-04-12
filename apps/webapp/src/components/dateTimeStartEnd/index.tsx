import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'utils/day';
import { DateTimeStartEndParam } from './types';
import './style.scss';

const DateTimeStartEnd = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}: DateTimeStartEndParam) => {
  const filterPassedTime = (time: Date) => {
    const currentDate = dayjs();
    const selectedDate = dayjs(time);

    return selectedDate.isAfter(currentDate);
  };

  return (
    <div className="m-5 flex justify-center flex-wrap">
      <div className="flex mt-2 w-full items-center bg-white border rounded-lg py-2 px-3 sm:mt-0 sm:w-auto">
        <p className="text-indigo-600 font-bold mr-2">From:</p>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(dayjs(date).toDate())}
          selectsStart
          showTimeSelect
          startDate={startDate}
          endDate={endDate}
          dateFormat="MMMM d, yyyy h:mm aa"
        />
      </div>
      <div className="flex mt-2 w-full items-center bg-white border rounded-lg py-2 px-3 sm:ml-3 sm:mt-0 sm:w-auto">
        <p className="text-indigo-600 font-bold mr-2">To:</p>
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(dayjs(date).toDate())}
          selectsEnd
          showTimeSelect
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          filterTime={filterPassedTime}
          dateFormat="MMMM d, yyyy h:mm aa"
        />
      </div>
    </div>
  );
};

export default DateTimeStartEnd;

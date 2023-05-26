import { Menu, Transition } from '@headlessui/react';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  EllipsisHorizontalIcon,
} from '@heroicons/react/24/outline';
import EventsList from 'components/eventsList';
import { Dayjs } from 'dayjs/esm/index';
import { Fragment, useEffect, useState } from 'react';
import { classNames } from 'utils/common';
import dayjs from 'utils/day';
import { FormattedDateObj } from './types';
import useEventsApi from 'apis/event';

const Calendar = () => {
  const eventsApi = useEventsApi();
  const [currentMonth, setCurrentMonth] = useState(dayjs(new Date()));
  const [arrayOfDays, setArrayOfDays] = useState<FormattedDateObj[]>([]);
  const [selectedDay, setSelectedDay] = useState<number>(-1);

  useEffect(() => {
    getAllDays();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentMonth]);

  const formattedDateObject = (date: Dayjs): FormattedDateObj => {
    const clonedObject = { ...date.toObject() };
    const formattedDObject = {
      day: clonedObject.date,
      month: clonedObject.months,
      year: clonedObject.years,
      isCurrentMonth: clonedObject.months === currentMonth.month(),
      isToday: date.isToday(),
      isSelected: false,
      events: [],
    };

    return formattedDObject;
  };

  const getAllDays = async () => {
    let currentDate = currentMonth.startOf('month');
    const nextMonth = currentDate.add(1, 'month').month();

    const events = await getEventsData(
      currentDate,
      currentDate.add(1, 'month').startOf('month')
    );

    const allDates: FormattedDateObj[] = [];

    while (currentDate.weekday(0).toObject().months !== nextMonth) {
      const formatted = formattedDateObject(currentDate);

      for (const event of events) {
        const eventStart = dayjs(event.eventStart);
        const eventEnd = dayjs(event.eventEnd);
        if (
          eventStart.isSame(currentDate, 'day') ||
          eventEnd.isSame(currentDate, 'day') ||
          (eventStart.isBefore(currentDate) && eventEnd.isAfter(currentDate))
        ) {
          formatted.events.push(event);
        }
      }

      if (formatted.isToday) setSelectedDay(allDates.length);

      allDates.push(formatted);
      currentDate = currentDate.add(1, 'day');
    }

    setArrayOfDays(allDates);
  };

  const getEventsData = async (start: Dayjs, end: Dayjs) => {
    try {
      const res = await eventsApi.List({
        eventStartAfter: start.toISOString(),
        eventStartBefore: end.toISOString(),
        includeCounts: true,
      });
      return res.content || [];
    } catch (error) {
      console.log('Failed to get events data, ERR:: ', error);
    }
    return [];
  };

  const goToToday = () => {
    setCurrentMonth(dayjs(new Date()));
  };

  const nextMonth = () => {
    const plus = currentMonth.add(1, 'month');
    setCurrentMonth(plus);
  };

  const prevMonth = () => {
    const minus = currentMonth.subtract(1, 'month');
    setCurrentMonth(minus);
  };

  return (
    <div className="mx-auto sm:px-6 lg:px-8 lg:mt-6 w-full md:w-[50rem] lg:w-[80rem]">
      <div className="lg:flex lg:h-full lg:flex-col">
        <header className="flex items-center justify-between border-b border-gray-200 px-6 py-4 lg:flex-none">
          <h1 className="font-semibold leading-6 text-gray-100 text-2xl">
            {currentMonth
              .toDate()
              .toLocaleDateString('en-us', { month: 'long', year: 'numeric' })}
          </h1>
          <div className="flex items-center">
            <div className="relative flex items-center rounded-md bg-white shadow-sm md:items-stretch">
              <div
                className="pointer-events-none absolute inset-0 rounded-md ring-1 ring-inset ring-gray-300"
                aria-hidden="true"
              />
              <button
                type="button"
                className="flex items-center justify-center rounded-l-md py-2 pl-3 pr-4 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:px-2 md:hover:bg-gray-50"
                onClick={prevMonth}
              >
                <span className="sr-only">Previous month</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="hidden px-3.5 text-sm font-semibold text-gray-900 hover:bg-gray-50 focus:relative md:block"
                onClick={goToToday}
              >
                Today
              </button>
              <span className="relative -mx-px h-5 w-px bg-gray-300 md:hidden" />
              <button
                type="button"
                className="flex items-center justify-center rounded-r-md py-2 pl-4 pr-3 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:px-2 md:hover:bg-gray-50"
                onClick={nextMonth}
              >
                <span className="sr-only">Next month</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            <Menu as="div" className="relative ml-6 md:hidden">
              <Menu.Button className="-mx-2 flex items-center rounded-full border border-transparent p-2 text-gray-400 hover:text-gray-500">
                <span className="sr-only">Open menu</span>
                <EllipsisHorizontalIcon
                  className="h-5 w-5"
                  aria-hidden="true"
                />
              </Menu.Button>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-3 w-36 origin-top-right divide-y divide-gray-100 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <div
                          className={classNames([
                            active
                              ? 'bg-gray-100 text-gray-900'
                              : 'text-gray-700',
                            'block px-4 py-2 text-sm',
                          ])}
                          onClick={goToToday}
                        >
                          Go to today
                        </div>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </header>
        <div className="shadow ring-1 ring-black ring-opacity-5 lg:flex lg:flex-auto lg:flex-col">
          <div className="grid grid-cols-7 gap-px border-b border-gray-300 bg-gray-200 text-center text-xs font-semibold leading-6 text-gray-700 lg:flex-none">
            <div className="bg-white py-2">
              S<span className="sr-only sm:not-sr-only">un</span>
            </div>
            <div className="bg-white py-2">
              M<span className="sr-only sm:not-sr-only">on</span>
            </div>
            <div className="bg-white py-2">
              T<span className="sr-only sm:not-sr-only">ue</span>
            </div>
            <div className="bg-white py-2">
              W<span className="sr-only sm:not-sr-only">ed</span>
            </div>
            <div className="bg-white py-2">
              T<span className="sr-only sm:not-sr-only">hu</span>
            </div>
            <div className="bg-white py-2">
              F<span className="sr-only sm:not-sr-only">ri</span>
            </div>
            <div className="bg-white py-2">
              S<span className="sr-only sm:not-sr-only">at</span>
            </div>
          </div>
          <div className="flex bg-gray-200 text-xs leading-6 text-gray-700 lg:flex-auto">
            <div className="hidden w-full lg:grid lg:grid-cols-7 lg:grid-rows-6 lg:gap-px">
              {arrayOfDays.map(
                ({ day, isCurrentMonth, isToday, events }, idx) => (
                  <div
                    key={idx + 'lg'}
                    className={classNames([
                      isCurrentMonth ? 'bg-white' : 'bg-gray-50 text-gray-500',
                      'relative px-3 py-2 min-h-[150px]',
                    ])}
                    onClick={() => setSelectedDay(idx)}
                  >
                    <div
                      className={classNames([
                        isToday ? 'bg-indigo-600 text-white' : 'text-gray-400',
                        'h-6 w-6 flex items-center justify-center rounded-full font-semibold',
                        selectedDay === idx
                          ? 'bg-indigo-300 text-white'
                          : 'text-gray-400',
                      ])}
                    >
                      <p>{day}</p>
                    </div>
                    {events.length > 0 && (
                      <ol className="mt-2">
                        {events.slice(0, 2).map(({ id, title }) => (
                          <li key={id}>
                            <a href={'/event/' + id} className="group flex">
                              <p className="flex-auto truncate font-medium text-gray-900 group-hover:text-indigo-600">
                                {title}
                              </p>
                            </a>
                          </li>
                        ))}
                        {events.length > 2 && (
                          <li className="text-gray-500">
                            + {events.length - 2} more
                          </li>
                        )}
                      </ol>
                    )}
                  </div>
                )
              )}
            </div>
            <div className="isolate grid w-full grid-cols-7 grid-rows-6 gap-px lg:hidden">
              {arrayOfDays.map(
                ({ day, isCurrentMonth, isToday, events }, idx) => (
                  <button
                    key={idx + 'sm'}
                    type="button"
                    className={classNames([
                      isCurrentMonth ? 'bg-white' : 'bg-gray-50',
                      'flex h-14 flex-col px-3 py-2 hover:bg-gray-100 focus:z-10',
                    ])}
                    onClick={() => setSelectedDay(idx)}
                  >
                    <div
                      className={classNames([
                        selectedDay === idx
                          ? 'bg-indigo-300 text-white'
                          : 'text-gray-400',
                        isToday ? 'bg-indigo-600 text-white' : 'text-gray-400',
                        'ml-auto flex h-6 w-6 items-center justify-center rounded-full',
                      ])}
                    >
                      {day}
                    </div>
                    <span className="sr-only">{events.length} events</span>
                    {events.length > 0 && (
                      <span className="-mx-0.5 mt-auto flex flex-wrap-reverse">
                        {events.map((event) => (
                          <span
                            key={event.id}
                            className="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-gray-400"
                          />
                        ))}
                      </span>
                    )}
                  </button>
                )
              )}
            </div>
          </div>
        </div>
        {arrayOfDays[selectedDay]?.events.length > 0 && (
          <div className="mx-auto max-w-7xl p-3 sm:p-6 lg:p-8 bg-white rounded-md my-8">
            <EventsList data={arrayOfDays[selectedDay].events} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Calendar;

import { useState, useEffect } from 'react';
import EventsList from 'components/eventsList';
import { classNames } from 'utils/common';
import useEventsApi from 'apis/event';
import dayjs from 'dayjs';
import { GetEventsResponse } from '@event-planner/types/src';

const MyEvents = () => {
  const eventsApi = useEventsApi();
  const [showUpcoming, setShowUpcoming] = useState<boolean>(true);
  const [data, setData] = useState<GetEventsResponse['content']>([]);

  useEffect(() => {
    eventsApi
      .List({
        eventStartAfter: showUpcoming ? dayjs().toISOString() : undefined,
        eventStartBefore: !showUpcoming ? dayjs().toISOString() : undefined,
        includeCounts: true,
        offset: 0,
        size: 10,
      })
      .then((eventsPage) => {
        if (!eventsPage) return;
        setData(eventsPage.content);
      });
  }, [showUpcoming]);

  const tabsNavigation = () => {
    return (
      <nav className="flex space-x-4 lg:mb-14" aria-label="Tabs">
        <div
          className={classNames([
            showUpcoming
              ? 'bg-gray-100 text-indigo-600'
              : 'text-gray-500 hover:text-indigo-600 hover:bg-gray-100 hover:cursor-pointer',
            'rounded-md px-3 py-2 text-sm font-medium',
          ])}
          onClick={() => setShowUpcoming(true)}
        >
          Upcoming events
        </div>
        <div
          className={classNames([
            !showUpcoming
              ? 'bg-gray-100 text-indigo-600'
              : 'text-gray-500 hover:text-indigo-600 hover:bg-gray-100 hover:cursor-pointer',
            'rounded-md px-3 py-2 text-sm font-medium',
          ])}
          onClick={() => setShowUpcoming(false)}
        >
          Past events
        </div>
      </nav>
    );
  };

  return (
    <div className="overflow-hidde shadow sm:rounded-md mx-auto my-6 max-w-6xl px-4 p-8 sm:px-6 lg:mt-12 lg:px-8 bg-white border rounded-lg">
      <div className="mx-auto w-full sm:w-[700px]">
        {tabsNavigation()}
        <EventsList data={data} />
      </div>
    </div>
  );
};

export default MyEvents;

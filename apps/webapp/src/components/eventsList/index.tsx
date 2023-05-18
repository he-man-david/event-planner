import { CalendarIcon, UsersIcon } from '@heroicons/react/24/outline';
import { GetEventsResponse } from '@event-planner/types/src';
import { dateToLocalTimeZoneDate, dayjsToFormattedString } from 'utils/common';

const EventsList = ({ data }: { data: GetEventsResponse['content'] }) => {
  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-md">
      <ul className="divide-y divide-gray-200">
        {data.map(
          ({
            id,
            title,
            description,
            eventStart,
            eventEnd,
            members: memberCount,
            planned: isPlanned,
          }) => (
            <li key={id}>
              <a className="block hover:bg-gray-50" href={`/event/${id}`}>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <p className="truncate text-sm font-medium text-indigo-600">
                      {title}
                    </p>
                    {isPlanned && (
                      <div className="ml-2 flex flex-shrink-0">
                        <p className="inline-flex rounded-full bg-yellow-100 px-2 text-xs font-semibold leading-5 text-yellow-800">
                          Planning
                        </p>
                      </div>
                    )}
                  </div>
                  <p className="truncate text-left text-gray-500 lg:w-full lg:mt-4 w-64 mt-2">
                    {description}
                  </p>
                  <div className="mt-3 sm:flex sm:justify-between">
                    <div className="flex items-center text-sm text-gray-500 mr-5">
                      <UsersIcon
                        className="mr-1.5 h-5 w-5 flex-shrink-0 text-indigo-500"
                        aria-hidden="true"
                      />
                      {memberCount + ' members'}
                    </div>
                    <div className="mt-2 flex justify-start text-sm text-gray-500 sm:mt-0 flex-col sm:flex-row">
                      <div className="flex">
                        <CalendarIcon
                          className="mr-1.5 h-5 w-5 flex-shrink-0 text-indigo-500"
                          aria-hidden="true"
                        />
                        {dayjsToFormattedString(
                          dateToLocalTimeZoneDate(eventStart)
                        )}
                      </div>
                      <div className="flex">
                        <p className="text-indigo-500 mr-2 sm:mx-2 font-medium">
                          To
                        </p>
                        {dayjsToFormattedString(
                          dateToLocalTimeZoneDate(eventEnd)
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default EventsList;

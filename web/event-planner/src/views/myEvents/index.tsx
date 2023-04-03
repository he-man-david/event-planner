import { useState, useEffect } from "react";
import { EventListItm } from "components/eventsList/types";
import EventsList from "components/eventsList";
import { classNames } from "utils/common";
import { MyEventsUpcomingData, MyEventsPastData } from "mockData";

const MyEvents = () => {
  const [showUpcoming, setShowUpcoming] = useState<boolean>(true);
  const [data, setData] = useState<EventListItm[]>(MyEventsUpcomingData);

  useEffect(() => {
    if (showUpcoming) setData(MyEventsUpcomingData);
    else setData(MyEventsPastData);
  }, [showUpcoming]);

  const tabsNavigation = () => {
    return (
      <nav className="flex space-x-4 lg:mb-14" aria-label="Tabs">
        <div
          className={classNames([
            showUpcoming
              ? "bg-gray-100 text-indigo-600"
              : "text-gray-500 hover:text-indigo-600 hover:bg-gray-100 hover:cursor-pointer",
            "rounded-md px-3 py-2 text-sm font-medium",
          ])}
          onClick={() => setShowUpcoming(true)}
        >
          Upcoming events
        </div>
        <div
          className={classNames([
            !showUpcoming
              ? "bg-gray-100 text-indigo-600"
              : "text-gray-500 hover:text-indigo-600 hover:bg-gray-100 hover:cursor-pointer",
            "rounded-md px-3 py-2 text-sm font-medium",
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
      {tabsNavigation()}
      <EventsList data={data} />
    </div>
  );
};

export default MyEvents;

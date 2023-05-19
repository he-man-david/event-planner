import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid';
import { classNames } from 'utils/common';
import EventStatus from 'components/eventStatus';

export enum EventActionsType {
  status = 1,
  calendar,
  share,
  delete,
}

interface EventActionDropdownProps {
  status: boolean;
  callBack: (e: EventActionsType) => void;
}

const EventActionDropdown = ({
  status,
  callBack,
}: EventActionDropdownProps) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="flex items-center rounded-full text-gray-200 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
          <span className="sr-only">Open options</span>
          <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 divide-y divide-gray-100 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-4 py-3">
            <EventStatus status={status} />
          </div>
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <p
                  className={classNames([
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm',
                  ])}
                  onClick={() => callBack(EventActionsType.status)}
                >
                  {status ? 'Back to planning' : 'Mark as complete'}
                </p>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <p
                  className={classNames([
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm',
                  ])}
                  onClick={() => callBack(EventActionsType.calendar)}
                >
                  Send calendar invite
                </p>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <p
                  className={classNames([
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm',
                  ])}
                  onClick={() => callBack(EventActionsType.share)}
                >
                  Share event
                </p>
              )}
            </Menu.Item>
          </div>
          <div className="py-1 ">
            <Menu.Item>
              {({ active }) => (
                <p
                  className={classNames([
                    active ? 'bg-gray-100 text-red-800' : 'text-red-600',
                    'block px-4 py-2 text-sm',
                  ])}
                  onClick={() => callBack(EventActionsType.delete)}
                >
                  Delete event
                </p>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default EventActionDropdown;

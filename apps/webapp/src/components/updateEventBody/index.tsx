import {
  CheckCircleIcon,
  EllipsisVerticalIcon,
} from '@heroicons/react/20/solid';
import { classNames } from 'utils/common';
import LinkPreview from 'components/linkPreview';
import { UpdateEventBodyParam } from './types';
import { EventOptionBodyWithVotes } from '@event-planner/types/src';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';

const UpdateEventBody = ({
  eventOptions,
  setEventOptions,
  editEventOptions,
  delEventOptions,
}: UpdateEventBodyParam) => {
  const handleVote = (position: number) => {
    const newEventOptions: EventOptionBodyWithVotes[] = eventOptions.map(
      (eventOption, idx) => {
        if (position === idx) {
          if (eventOption.voted) {
            eventOption.voted = false;
            eventOption.votes && eventOption.votes--;
          } else {
            eventOption.voted = true;
            eventOption.votes && eventOption.votes++;
          }
        }
        return eventOption;
      }
    );

    setEventOptions(newEventOptions);
  };

  return (
    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-1 md:grid-cols-2">
      {eventOptions.map(
        ({ id, title, description, votes, voted, ...linkPreview }, idx) => (
          <li
            key={title + id}
            className={classNames([
              voted ? 'border-indigo-600 border-2' : 'border',
              'col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow  max-w-sm',
            ])}
          >
            <div className="flex flex-1 flex-col p-8">
              <div className="w-full flex justify-end -mt-6 ml-6">
                <Menu as="div" className="relative ml-3 flex-shrink-0">
                  <div>
                    <Menu.Button>
                      <EllipsisVerticalIcon
                        className="h-4 w-4 ml-5 hover:cursor-pointer text-slate-500 hover:text-slate-600"
                        aria-hidden="true"
                      />
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
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <span
                            onClick={() => editEventOptions(idx)}
                            className={classNames([
                              active ? 'bg-gray-100' : '',
                              'block py-2 px-4 text-sm text-gray-700',
                            ])}
                          >
                            Edit
                          </span>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <span
                            onClick={() => delEventOptions(idx)}
                            className={classNames([
                              active ? 'bg-gray-100' : '',
                              'block py-2 px-4 text-sm text-red-700',
                            ])}
                          >
                            Delete
                          </span>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
              <h3 className="text-md font-medium text-gray-900">{title}</h3>
              <div className="mt-1 flex flex-grow flex-col">
                <p className="text-md text-gray-500 pb-3">{description}</p>
                {linkPreview.linkUrl && <LinkPreview {...linkPreview} />}
              </div>
            </div>
            <div className="-mt-px flex divide-x divide-gray-200">
              <div className="flex w-0 flex-1">
                <p className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900">
                  {votes + ' votes'}
                </p>
              </div>
              <div
                className="-ml-px flex w-0 flex-1"
                onClick={() => handleVote(idx)}
              >
                {voted ? (
                  <button className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900">
                    <CheckCircleIcon className="text-indigo-600 h-5 w-5" />
                  </button>
                ) : (
                  <button className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900">
                    Vote
                  </button>
                )}
              </div>
            </div>
          </li>
        )
      )}
    </ul>
  );
};

export default UpdateEventBody;

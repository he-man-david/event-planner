import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Avatar from 'react-avatar';

type MembersModalProps = {
  data: any[];
  totalCount: number;
};

const MembersModal = ({ data, totalCount }: MembersModalProps) => {
  const [open, setOpen] = useState(false);

  const generateAvatars = () => {
    return (
      <div className="isolate flex -space-x-2 overflow-hidden">
        {data.map(({ memberInfo }, idx) => {
          const { name, email } = memberInfo;
          return (
            <Avatar
              key={idx}
              name={name ? name : email}
              round={true}
              size="45"
            />
          );
        })}
      </div>
    );
  };

  return (
    <div className="flex flex-col text-left">
      <p className="text-gray-500 sm:text-sm sm:leading-6 pb-2">
        {totalCount} Members
      </p>
      <div className="avatar-row flex justify-between aligh">
        {generateAvatars()}
        {totalCount > 5 ? (
          <p
            className="text-indigo-600 sm:text-sm sm:leading-6 hover:underline hover:text-indigo-500 hover:cursor-pointer font-bold"
            onClick={() => setOpen(true)}
          >
            Show All
          </p>
        ) : null}
      </div>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <div className="fixed inset-0" />

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                    <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                      <div className="px-4 sm:px-6">
                        <div className="flex items-start justify-between">
                          <Dialog.Title className="text-base font-semibold leading-6 text-gray-900">
                            {totalCount} Members
                          </Dialog.Title>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                              onClick={() => setOpen(false)}
                            >
                              <span className="sr-only">Close panel</span>
                              <XMarkIcon
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="relative mt-6 flex-1 px-4 sm:px-6 overflow-auto">
                        {data.map(({ userId, memberInfo }, idx) => {
                          const { name, email } = memberInfo;
                          return (
                            <div
                              key={userId + '-avatar-row-' + idx}
                              className="flex items-center my-5"
                            >
                              <Avatar
                                key={idx}
                                name={name ? name : email}
                                round={true}
                                size="45"
                              />
                              <div className="ml-3">
                                <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                                  Tom Cook
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};

export default MembersModal;

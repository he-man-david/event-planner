import { EventOptionBodyWithVotes } from '@event-planner/types/src';
import { Dialog, RadioGroup, Transition } from '@headlessui/react';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import LinkPreview from 'components/linkPreview';
import { Fragment } from 'react';
import { classNames } from 'utils/common';

interface SelectFinalEventModalProps {
  eventOptions: EventOptionBodyWithVotes[];
  eventOptionId: string;
  setEventOptionId: (e: string) => void;
  handleUpdateStatus: (e: string, b: boolean) => void;
  open: boolean;
  setOpen: (t: boolean) => void;
}

const SelectFinalEventModal = ({
  eventOptions,
  eventOptionId,
  setEventOptionId,
  open,
  setOpen,
  handleUpdateStatus,
}: SelectFinalEventModalProps) => {
  const handleSubmit = () => {
    handleUpdateStatus(eventOptionId, true);
    setOpen(false);
  };
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl sm:p-6">
                <RadioGroup value={eventOptionId} onChange={setEventOptionId}>
                  <RadioGroup.Label className="text-base font-semibold leading-6 text-gray-900">
                    Select your final option
                  </RadioGroup.Label>

                  <div className="p-2 sm:p-10 grid grid-cols-1 gap-6 sm:grid-cols-1 md:grid-cols-2">
                    {eventOptions.map(
                      ({ id, title, description, ...linkPreview }) => (
                        <RadioGroup.Option
                          key={id}
                          value={id}
                          className={({ checked, active }) =>
                            classNames([
                              checked
                                ? 'border-transparent'
                                : 'border-gray-300',
                              active
                                ? 'border-indigo-600 ring-2 ring-indigo-600'
                                : '',
                              'relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none',
                            ])
                          }
                        >
                          {({ checked, active }) => (
                            <>
                              <span className="flex flex-1">
                                <span className="flex flex-col">
                                  <h3 className="text-md font-medium text-gray-900">
                                    {title}
                                  </h3>
                                  <div className="mt-1 flex flex-grow flex-col">
                                    <p className="text-md text-gray-500 pb-3">
                                      {description}
                                    </p>
                                    {linkPreview.linkUrl && (
                                      <LinkPreview {...linkPreview} />
                                    )}
                                  </div>
                                </span>
                              </span>
                              <CheckCircleIcon
                                className={classNames([
                                  !checked ? 'invisible' : '',
                                  'h-5 w-5 text-indigo-600',
                                ])}
                                aria-hidden="true"
                              />
                              <span
                                className={classNames([
                                  active ? 'border' : 'border-2',
                                  checked
                                    ? 'border-indigo-600'
                                    : 'border-transparent',
                                  'pointer-events-none absolute -inset-px rounded-lg',
                                ])}
                                aria-hidden="true"
                              />
                            </>
                          )}
                        </RadioGroup.Option>
                      )
                    )}
                  </div>
                </RadioGroup>
                <div className="w-full flex justify-center my-3">
                  <button
                    type="button"
                    disabled={eventOptionId.length === 0}
                    className="flex w-40 justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default SelectFinalEventModal;

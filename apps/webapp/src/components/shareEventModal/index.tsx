import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

interface ShareEventModalProps {
  open: boolean;
  setOpen: (b: boolean) => void;
  url: string;
}

// TODO: passing in window.location.pathname as url, in future can use generated short url
const ShareEventModal = ({ open, setOpen, url }: ShareEventModalProps) => {
  const [copied, setCopied] = useState<boolean>(false);

  const copyTextToClipboard = async (text: string) => {
    if ('clipboard' in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand('copy', true, text);
    }
  };

  const handleCopy = () => {
    // Asynchronously call copyTextToClipboard
    copyTextToClipboard(url)
      .then(() => {
        // If successful, update the isCopied state value
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
      });
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-3xl sm:p-6">
                <div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900"
                    >
                      Share Event
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Share event using this url below.
                      </p>
                    </div>
                    <div className="mt-4 p-2 w-full font-medium flex flex-wrap gap-3">
                      <p className="ring-2 ring-indigo-600 rounded-md p-2 overflow-scroll">
                        {url}
                      </p>
                      <div
                        onClick={handleCopy}
                        className="rounded-md p-2 w-20 flex justify-center bg-indigo-600 hover:cursor-pointer hover:bg-indigo-900"
                      >
                        {copied ? (
                          <CheckCircleIcon
                            className="h-6 w-6 text-slate-200 font-bold"
                            aria-hidden="true"
                          />
                        ) : (
                          'Copy'
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ShareEventModal;

import { classNames } from 'utils/common';
import LinkPreview from 'components/linkPreview';
import { CreateEventBodyParam } from './types';

const CreateEventBody = ({
  eventOptions,
  editEventOptions,
  delEventOptions,
}: CreateEventBodyParam) => {
  return (
    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-1 md:grid-cols-2">
      {eventOptions?.map(({ title, description, ...linkPreview }, idx) => (
        <li
          key={title + idx}
          className={classNames([
            ' w-80 col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow',
          ])}
        >
          <div className="flex flex-1 flex-col p-8">
            <h3 className="text-md font-medium text-gray-900">{title}</h3>
            <div className="mt-1 flex flex-grow flex-col justify-between">
              <p className="text-md text-gray-500 pb-3">{description}</p>
              {linkPreview.linkUrl && <LinkPreview {...linkPreview} />}
            </div>
          </div>
          <div className="-mt-px flex divide-x divide-gray-200">
            {
              <>
                <div className="flex w-0 flex-1  hover:bg-gray-100">
                  <button
                    className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                    onClick={() => editEventOptions(idx)}
                  >
                    Edit
                  </button>
                </div>
                <div className="-ml-px flex w-0 flex-1 hover:bg-gray-100">
                  <button
                    className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-red-600"
                    onClick={() => delEventOptions(idx)}
                  >
                    Delete
                  </button>
                </div>
              </>
            }
          </div>
        </li>
      ))}
    </ul>
  );
};

export default CreateEventBody;

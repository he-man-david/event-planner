import { CheckCircleIcon } from '@heroicons/react/20/solid';
import { classNames } from 'utils/common';
import LinkPreview from 'components/linkPreview';
import { CreateEventBodyParam } from './types';
import { EventOption } from 'types';

const CreateEventBody = ({
  voteOptions,
  setVoteOptions,
  editVoteOptions,
  delVoteOptions,
  editMode,
}: CreateEventBodyParam) => {
  const handleVote = (position: number) => {
    const newVoteOptions: EventOption[] = voteOptions.map((voteOption, idx) => {
      if (position === idx) {
        if (voteOption.voted) {
          voteOption.voted = false;
          voteOption.votes && voteOption.votes--;
        } else {
          voteOption.voted = true;
          voteOption.votes && voteOption.votes++;
        }
      }
      return voteOption;
    });

    setVoteOptions(newVoteOptions);
  };

  return (
    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-1 md:grid-cols-2">
      {voteOptions.map(
        ({ id, title, linkPreview, desc, votes, voted }, idx) => (
          <li
            key={title + id}
            className={classNames([
              voted ? 'border-indigo-600 border-2' : 'border',
              ' w-80 col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow',
            ])}
          >
            <div className="flex flex-1 flex-col p-8">
              <h3 className="text-md font-medium text-gray-900">{title}</h3>
              <div className="mt-1 flex flex-grow flex-col justify-between">
                <p className="text-md text-gray-500 pb-3">{desc}</p>
                {linkPreview.imageUrl ? (
                  <LinkPreview {...linkPreview} />
                ) : (
                  <a
                    href={linkPreview.link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-indigo-600 hover:text-indigo-500 underline"
                  >
                    Open link
                  </a>
                )}
              </div>
            </div>
            <div className="-mt-px flex divide-x divide-gray-200">
              {editMode ? (
                <>
                  <div className="flex w-0 flex-1  hover:bg-gray-100">
                    <button
                      className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                      onClick={() => editVoteOptions(idx)}
                    >
                      Edit
                    </button>
                  </div>
                  <div className="-ml-px flex w-0 flex-1 hover:bg-gray-100">
                    <button
                      className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-red-600"
                      onClick={() => delVoteOptions(idx)}
                    >
                      Delete
                    </button>
                  </div>
                </>
              ) : (
                <>
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
                </>
              )}
            </div>
          </li>
        )
      )}
    </ul>
  );
};

export default CreateEventBody;

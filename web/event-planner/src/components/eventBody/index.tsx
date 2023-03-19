import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { classNames } from "utils/common";
import LinkPreview from "components/linkPreview";
import { EventOption, EventBodyParam } from "./types";

const EventBody = ({
  voteOptions,
  setVoteOptions,
  editVoteOptions,
  delVoteOptions,
  editMode,
}: EventBodyParam) => {
  const handleVote = (position: number) => {
    const newVoteOptions: EventOption[] = voteOptions.map((voteOption, idx) => {
      if (position === idx) {
        if (voteOption.voted) {
          voteOption.voted = false;
          voteOption.votes!--;
        } else {
          voteOption.voted = true;
          voteOption.votes!++;
        }
      }
      return voteOption;
    });

    setVoteOptions(newVoteOptions);
  };

  const handleEdit = (pos: number) => {
    if (editVoteOptions) editVoteOptions(pos);
  };

  const handleDelete = (pos: number) => {
    if (delVoteOptions) delVoteOptions(pos);
  };

  return (
    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-1 md:grid-cols-2">
      {voteOptions.map(
        ({ id, title, linkPreview, desc, votes, voted }, idx) => (
          <li
            key={title + id}
            className={classNames([
              voted ? "border-indigo-600 border-2" : "border",
              "col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow  max-w-sm",
            ])}
          >
            <div className="flex flex-1 flex-col p-8">
              <h3 className="text-md font-medium text-gray-900">{title}</h3>
              <div className="mt-1 flex flex-grow flex-col justify-between">
                <p className="text-md text-gray-500 pb-3">{desc}</p>
                <LinkPreview {...linkPreview} />
              </div>
            </div>
            <div className="-mt-px flex divide-x divide-gray-200">
              {editMode ? (
                <>
                  <div className="flex w-0 flex-1  hover:bg-gray-100">
                    <button
                      className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                      onClick={() => handleEdit(idx)}
                    >
                      Edit
                    </button>
                  </div>
                  <div className="-ml-px flex w-0 flex-1 hover:bg-gray-100">
                    <button
                      className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-red-600"
                      onClick={() => handleDelete(idx)}
                    >
                      Delete
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex w-0 flex-1">
                    <p className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900">
                      {votes + " votes"}
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

export default EventBody;

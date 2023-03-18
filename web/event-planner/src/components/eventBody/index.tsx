import { useState } from "react";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { classNames } from "utils/common";
import LinkPreview from "components/linkPreview";
import pic1 from "static/airbnb-1.jpeg";
import pic2 from "static/airbnb-2.jpeg";
import pic3 from "static/airbnb-3.jpeg";
import pic4 from "static/airbnb-4.jpeg";
import pic5 from "static/airbnb-5.jpeg";

const data = [
  {
    id: 1,
    title: "Downtown",
    linkPreview: {
      imageUrl: pic1,
      title: "This is link title",
      desc: "This is description from the link preview itself. Link preview description.",
      link: "https://airbnb.com",
    },
    desc: "Close to trains",
    votes: 0,
    voted: false,
  },
  {
    id: 2,
    title: "Downtown 2",
    linkPreview: {
      imageUrl: pic2,
      title: "This is link title",
      desc: "This is description from the link preview itself. Link preview description.",
      link: "https://airbnb.com",
    },
    desc: "A bit smaller only 2bd",
    votes: 2,
    voted: false,
  },
  {
    id: 3,
    title: "Midtown",
    linkPreview: {
      imageUrl: pic3,
      title: "This is link title",
      desc: "This is description from the link preview itself. Link preview description.",
      link: "https://airbnb.com",
    },
    desc: "Good location",
    votes: 1,
    voted: false,
  },
  {
    id: 4,
    title: "Midtown Central",
    linkPreview: {
      imageUrl: pic4,
      title: "This is link title",
      desc: "This is description from the link preview itself. Link preview description.",
      link: "https://airbnb.com",
    },
    desc: "A bit smaller but cheaper",
    votes: 6,
    voted: false,
  },
  {
    id: 5,
    title: "Uptown",
    linkPreview: {
      imageUrl: pic5,
      title: "This is link title",
      desc: "This is description from the link preview itself. Link preview description.",
      link: "https://airbnb.com",
    },
    desc: "Bit more expensive, I am down if yall are",
    votes: 3,
    voted: false,
  },
];

const EventBody = () => {
  const [voteOptions, setVoteOptions] = useState(data);

  const handleVote = (position: number) => {
    const newVoteOptions = voteOptions.map((voteOption, idx) => {
      if (position === idx) {
        if (voteOption.voted) {
          voteOption.voted = false;
          voteOption.votes--;
        } else {
          voteOption.voted = true;
          voteOption.votes++;
        }
      }
      return voteOption;
    });

    setVoteOptions(newVoteOptions);
  };

  return (
    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-2">
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
            <div>
              <div className="-mt-px flex divide-x divide-gray-200">
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
              </div>
            </div>
          </li>
        )
      )}
    </ul>
  );
};

export default EventBody;

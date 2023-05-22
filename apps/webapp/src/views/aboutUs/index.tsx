import { useId, useState } from 'react';
import { Menu } from '@headlessui/react';
import {
  CheckCircleIcon,
  EllipsisVerticalIcon,
} from '@heroicons/react/20/solid';

import { AppScreen } from './AppScreen';
import { Container } from './Container';
import { PhoneFrame } from './PhoneFrame';

const classNames = (classes: any) => {
  return classes.filter(Boolean).join(' ');
};

function BackgroundIllustration(props: any) {
  const id = useId();

  return (
    <div {...props}>
      <svg
        viewBox="0 0 1026 1026"
        fill="none"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full animate-spin-slow"
      >
        <path
          d="M1025 513c0 282.77-229.23 512-512 512S1 795.77 1 513 230.23 1 513 1s512 229.23 512 512Z"
          stroke="#cbd5e1"
          strokeOpacity="0.7"
        />
        <path
          d="M513 1025C230.23 1025 1 795.77 1 513"
          stroke={`url(#${id}-gradient-1)`}
          strokeLinecap="round"
        />
        <defs>
          <linearGradient
            id={`${id}-gradient-1`}
            x1="1"
            y1="513"
            x2="1"
            y2="1025"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#34d399" />
            <stop offset="1" stopColor="#34d399" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
      <svg
        viewBox="0 0 1026 1026"
        fill="none"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full animate-spin-reverse-slower"
      >
        <path
          d="M913 513c0 220.914-179.086 400-400 400S113 733.914 113 513s179.086-400 400-400 400 179.086 400 400Z"
          stroke="#cbd5e1"
          strokeOpacity="0.7"
        />
        <path
          d="M913 513c0 220.914-179.086 400-400 400"
          stroke={`url(#${id}-gradient-2)`}
          strokeLinecap="round"
        />
        <defs>
          <linearGradient
            id={`${id}-gradient-2`}
            x1="913"
            y1="513"
            x2="913"
            y2="913"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#4ade80" />
            <stop offset="1" stopColor="#4ade80" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function AppDemo() {
  const [votes, setVotes] = useState(5);
  const [voted, setVoted] = useState(false);

  const handleVote = () => {
    if (voted) {
      setVoted(false);
      setVotes(5);
    } else {
      setVoted(true);
      setVotes(6);
    }
  };

  return (
    <AppScreen className="bg-indigo-900">
      <AppScreen.Body>
        <div className="view-event-container min-h-full">
          <div className="header-container bg-indigo-600">
            <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
              <div className="flex justify-center">
                <h1 className="topic-title text-2xl font-bold tracking-tight text-white">
                  Reunion dinner!
                </h1>
              </div>
            </div>
            <div
              className={classNames([
                voted ? 'border-2 border-indigo-600' : 'border-2 border-white',
                'col-span-1 flex max-w-sm flex-col divide-y divide-gray-200 rounded-lg bg-white text-center  shadow',
              ])}
            >
              <div className="flex flex-1 flex-col p-4">
                <div className="-mt-6 ml-6 flex w-full justify-end">
                  <Menu as="div" className="relative ml-3 flex-shrink-0">
                    <div>
                      <Menu.Button>
                        <EllipsisVerticalIcon
                          className="ml-5 h-4 w-4 text-slate-500 hover:cursor-pointer hover:text-slate-600"
                          aria-hidden="true"
                        />
                      </Menu.Button>
                    </div>
                  </Menu>
                </div>

                <h3 className="text-md font-medium text-gray-900">
                  Sushi buffet
                </h3>
                <div className="mt-1 flex flex-grow flex-col">
                  <p className="text-md pb-3 text-gray-500">
                    Great spot, but wait time 30 minutes. Can we pls car pool?!
                  </p>
                  <img
                    src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F21%2Fdc%2F6e%2F21dc6e4d8056ccffcd1e4ca78fbcedda.jpg&f=1&nofb=1&ipt=a701caee071bbb6789a97106a0a8ac02428e00436a5adcf4b137278639c746ed&ipo=images"
                    className="w-full rounded-xl"
                    alt="sushi"
                  />
                </div>
              </div>
              <div className="-mt-px flex divide-x divide-gray-200">
                <div className="flex w-0 flex-1">
                  <p className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900">
                    {votes + ' votes'}
                  </p>
                </div>
                <div className="-ml-px flex w-0 flex-1" onClick={handleVote}>
                  {voted ? (
                    <button className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900">
                      <CheckCircleIcon className="h-5 w-5 text-indigo-600" />
                    </button>
                  ) : (
                    <button className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900">
                      Vote
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </AppScreen.Body>
    </AppScreen>
  );
}

const activity = [
  {
    id: 1,
    type: 'comment',
    person: { name: 'Eduardo Benz' },
    imageUrl:
      'https://images.unsplash.com/photo-1520785643438-5bf77931f493?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80',
    comment:
      "I think airbnb is cheaper than hotels, if we don't mind living 15 minutes from Las Vegas Strip.",
    date: '12m ago',
  },
  {
    id: 2,
    person: { name: 'Jason Meyers' },
    imageUrl:
      'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80',
    comment:
      'Dang..... $150 a night for hotel and they also charge resort fees?! Crazy...',
    date: '2h ago',
  },
  {
    id: 3,
    person: {
      name: 'Chelsea Hagon',
    },
    imageUrl:
      'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    comment: "Omgggg we are doing this!! Can't wait to see yall!",
    date: '2h ago',
  },
];

function AppDemo2() {
  return (
    <AppScreen className="bg-indigo-900">
      <AppScreen.Body>
        <ul className="p-4">
          {activity.map((activityItem, activityItemIdx) => (
            <li key={activityItem.id}>
              <div className="relative flex items-start space-x-3 py-3">
                <div className="relative">
                  <img
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-400 ring-8 ring-white"
                    src={activityItem.imageUrl}
                    alt="profile"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div>
                    <div className="text-sm">
                      <p className="font-medium text-gray-900">
                        {activityItem.person.name}
                      </p>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">
                      Commented {activityItem.date}
                    </p>
                  </div>
                  <div className="mt-2 text-sm text-gray-700">
                    <p>{activityItem.comment}</p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </AppScreen.Body>
    </AppScreen>
  );
}

export default function AboutUs() {
  return (
    <>
      <div className="overflow-hidden bg-indigo-700 py-8 sm:py-10 lg:h-[680px]">
        <Container>
          <div className="lg:grid lg:grid-cols-12 lg:gap-x-8 lg:gap-y-20">
            <div className="relative z-10 mx-auto max-w-2xl lg:col-span-7 lg:max-w-none lg:pt-20 xl:col-span-6">
              <h1 className="text-5xl font-bold tracking-tight text-emerald-500">
                Simple event planning with friends!
              </h1>
              <p className="mt-6 text-lg font-medium text-slate-300">
                A simple planning app, designed for friends! Teamtartar makes
                the basic stuffs easy, like figuring out which restaurants to
                eat at, or picking which airbnb to book. Simply create an event,
                vote among friends, and schedule calendar invites!
              </p>
            </div>
            <div className="relative mt-10 sm:mt-20 lg:col-span-5 lg:row-span-2 lg:mt-0 xl:col-span-6">
              <BackgroundIllustration className="absolute left-1/2 top-4 h-[1026px] w-[1026px] -translate-x-1/3 stroke-gray-300/70 [mask-image:linear-gradient(to_bottom,white_20%,transparent_75%)] sm:top-16 sm:-translate-x-1/2 lg:-top-16 lg:ml-12 xl:-top-14 xl:ml-0" />
              <div className="-mx-4 h-[660px] px-9 [mask-image:linear-gradient(to_bottom,white_75%,transparent)] sm:mx-0 lg:absolute lg:-inset-x-10 lg:-bottom-20 lg:-top-10 lg:px-0 lg:pt-10 xl:-bottom-32">
                <PhoneFrame className="mx-auto max-w-[366px]" priority>
                  <AppDemo />
                </PhoneFrame>
              </div>
            </div>
          </div>
        </Container>
      </div>
      <div className="overflow-hidden bg-slate-950 sm:py-10 lg:h-[700px]">
        <Container>
          <div className="lg:grid lg:grid-cols-12 lg:gap-x-8 lg:gap-y-20">
            <div className="relative mt-10 sm:mt-20 lg:col-span-5 lg:row-span-2 lg:mt-0 xl:col-span-6">
              <BackgroundIllustration className="absolute left-1/2 top-4 h-[1026px] w-[1026px] -translate-x-1/3 stroke-gray-300/70 [mask-image:linear-gradient(to_bottom,white_20%,transparent_75%)] sm:top-16 sm:-translate-x-1/2 lg:-top-16 lg:ml-12 xl:-top-14 xl:ml-0" />
              <div className="-mx-4 h-[660px] px-9 [mask-image:linear-gradient(to_bottom,white_75%,transparent)] sm:mx-0 lg:absolute lg:-inset-x-10 lg:-bottom-20 lg:-top-10 lg:px-0 lg:pt-10 xl:-bottom-32">
                <PhoneFrame className="mx-auto max-w-[366px]" priority>
                  <AppDemo2 />
                </PhoneFrame>
              </div>
            </div>
            <div className="relative z-10 mx-auto max-w-2xl lg:col-span-7 lg:max-w-none lg:pt-20 xl:col-span-6 pb-20">
              <h1 className="text-5xl font-bold tracking-tight text-indigo-500">
                Keep discussions in one place
              </h1>
              <p className="mt-6 text-lg font-medium text-slate-300">
                No need to create separate group chats. No need to deal with the
                hassle of different people using different chat apps. Keep
                conversations relevant, with discussion threads on the event.
              </p>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}

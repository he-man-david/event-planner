import { useState, useEffect } from 'react';
import { PlusIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import EditEventOptionModal from 'components/editEventOptionModal';
import CreateEventBody from 'components/createEventBody';
import DateTimeStartEnd from 'components/dateTimeStartEnd';
import { useStytchUser } from '@stytch/react';
import { CreateEvent as CreateEventApi } from 'apis/event';
import { CreateEventRequest, EventOptionBody } from '@event-planner/types/src';
import { useNavigate } from 'react-router-dom';
import { routes } from 'const/routes';
import LoadingPage from 'components/loadingPage';
import dayjs from 'utils/day';
import { GetLinkPreviewData } from 'utils/common';

const CreateEvent = () => {
  const [eventTitle, setEventTitle] = useState<string>('');
  const [eventDesc, setEventDesc] = useState<string>('');
  const [loadingNewOption, setLoadingNewOption] = useState<boolean>(false);
  const [eventOptions, setEventOptions] = useState<EventOptionBody[]>([]);
  const [showAddOptionForm, setShowAddOptionForm] = useState<boolean>(false);
  const [editOptionInfo, setEditOptionInfo] = useState<EventOptionBody | null>(
    null
  );
  const [editOptionPos, setEditOptionPos] = useState<number>(-1);
  const [startDate, setStartDate] = useState<Date>(
    dayjs().add(1, 'hour').toDate()
  );
  const [endDate, setEndDate] = useState<Date>(dayjs().add(2, 'hour').toDate());
  const navigate = useNavigate();

  const { user } = useStytchUser();
  const queryParams = new URLSearchParams(window.location.search);
  const cached = queryParams.get('cached');

  useEffect(() => {
    const createEventFromCacheAndRedir = async () => {
      const reqStr = localStorage.getItem('CreateEventRequest');
      if (reqStr && user) {
        try {
          const req = JSON.parse(reqStr);
          req.createdBy = user.user_id;
          // creating event API
          const event = await CreateEventApi(req);
          // cache localstorage so dont have to call GetEvent Api again
          localStorage.setItem(`event-${event?.id}`, JSON.stringify(event));
          navigate(`/event/${event?.id}?cached=true`);
        } catch (error) {
          console.error(error);
        }
      }
    };

    if (cached) {
      createEventFromCacheAndRedir();
    }
  }, [cached, navigate, user]);

  if (cached) {
    return <LoadingPage />;
  }

  const createEvent = async () => {
    // If not, save to local storage create-event Request body, open Stytch auth
    // on redirect back, send create-event API.
    // then route to /event/:id page
    const req: CreateEventRequest = {
      title: eventTitle,
      description: eventDesc,
      eventStart: startDate.toISOString(),
      eventEnd: endDate.toISOString(),
      options: eventOptions,
      createdBy: '',
    };
    try {
      if (user) {
        req.createdBy = user.user_id;
        const event = await CreateEventApi(req);
        // cache localstorage so dont have to call GetEvent Api again
        localStorage.setItem(`event-${event?.id}`, JSON.stringify(event));
        navigate(`/event/${event?.id}?cached=true`);
      } else {
        localStorage.setItem('CreateEventRequest', JSON.stringify(req));
        navigate(routes.LOGIN + `?next_route=${routes.NEW_EVENT}?cached=true`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const createOption = async (option: EventOptionBody) => {
    setLoadingNewOption(true);
    // 1) call backend to get link preview infos
    // 2) set preview info in data structure

    //TODO: make link input optional in TS
    if (option.linkUrl) {
      const res = await GetLinkPreviewData(option.linkUrl);
      if (res && res.success && res.result) {
        const { title, description, image, largestImage } = res.result;
        if (title) option.linkPreviewTitle = title;
        if (description) option.linkPreviewDesc = description;
        if (largestImage || image)
          option.linkPreviewImgUrl = largestImage || image || null;
      }
    }

    const newEvtOptions = [...eventOptions];
    if (editOptionPos >= 0) {
      newEvtOptions.splice(editOptionPos, 1, option);
      setEditOptionPos(-1);
    } else {
      newEvtOptions.unshift(option);
    }

    setLoadingNewOption(false);
    setEditOptionInfo(null);
    setEventOptions(newEvtOptions);
  };

  const handleEdit = (position: number) => {
    setEditOptionPos(position);
    setEditOptionInfo(() => {
      setShowAddOptionForm(true);
      return eventOptions[position];
    });
  };

  const handleDelete = (position: number) => {
    const newEvtOptions = [...eventOptions];
    newEvtOptions.splice(position, 1);
    setEventOptions(newEvtOptions);
  };

  const handleOptionModalDisplay = (open: boolean) => {
    if (!open) {
      setEditOptionPos(-1);
      setEditOptionInfo(null);
    }
    setShowAddOptionForm(open);
  };

  const submitButton = () => {
    return (
      <div className="mx-auto h-10 max-w-6xl mb-6">
        <button
          type="button"
          className="relative float-right inline-flex items-center gap-x-1.5 rounded-md bg-emerald-500 mx-7 px-3 py-2 text-lg font-semibold text-white shadow-sm hover:bg-emerald-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
          onClick={createEvent}
        >
          <CheckCircleIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
          Submit Your Event
        </button>
      </div>
    );
  };
  return (
    <div className="min-h-full">
      <div className="bg-indigo-600 pb-32">
        <header className="py-10">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <label
              htmlFor="event-title"
              className="block lg:float-left md:float-left text-2xl font-medium leading-6 text-white mb-5"
            >
              Event Title:
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="event-title"
                id="event-title"
                className="block w-full h-10 md:h-12 lg:h-14 rounded-md border-0 px-2 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:italic placeholder:text-gray-400 lg:placeholder:text-3xl md:placeholder:text-2xl sm:placeholder:text-1xl lg:text-3xl md:text-2xl sm:text-1xl focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:leading-6"
                placeholder="The perfect Airbnb for Vegas!!"
                value={eventTitle}
                onChange={(e) => setEventTitle(e.target.value)}
              />
            </div>
            <div className="mt-4">
              <label
                htmlFor="description"
                className="block lg:float-left md:float-left text-2xl font-medium leading-6 text-white mb-5"
              >
                Description
              </label>
              <div className="mt-2">
                <textarea
                  rows={2}
                  name="description"
                  id="description"
                  className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={eventDesc}
                  onChange={(e) => setEventDesc(e.target.value)}
                />
              </div>
            </div>
            <DateTimeStartEnd
              startDate={startDate}
              endDate={endDate}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
            />
          </div>
        </header>
      </div>
      <main className="-mt-32">
        <div className="mx-auto max-w-6xl px-4 p-8 sm:px-6 lg:px-8 bg-white border rounded-lg mb-5 flex items-center flex-col">
          <p className="mb-6 text-lg lg:text-2xl">
            Create event options below for voting
          </p>
          <button
            type="button"
            className="relative mb-9 inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 mx-7 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            onClick={() => setShowAddOptionForm(true)}
          >
            <PlusIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
            Add option
          </button>
          <CreateEventBody
            eventOptions={eventOptions}
            editEventOptions={handleEdit}
            delEventOptions={handleDelete}
          />
        </div>
      </main>
      {submitButton()}
      <EditEventOptionModal
        open={showAddOptionForm}
        setOpen={handleOptionModalDisplay}
        createOption={createOption}
        editOptionInfo={editOptionInfo}
        loading={loadingNewOption}
      />
    </div>
  );
};

export default CreateEvent;

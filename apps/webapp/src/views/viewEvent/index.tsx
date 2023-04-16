import { useState, useEffect } from 'react';
import UpdateEventBody from 'components/updateEventBody';
import Comments from 'components/comments';
import NewComment from 'components/newComment';
import { useParams } from 'react-router-dom';
import MembersModal from 'components/membersModal';
import Title from 'components/title';
import Description from 'components/description';
import EditEventOptionModal from 'components/editEventOptionModal';
import { PlusIcon } from '@heroicons/react/24/outline';
import {
  EventResponse,
  EventOptionBodyWithVotes,
  EventOptionBody,
  UpdateEventRequest,
  CreateEventOptionRequest,
} from '@event-planner/types/src';
import { GetEvent, UpdateEvent } from 'apis/event';
import { CreateOption, UpdateOption } from 'apis/eventOptions';
import { GetLinkPreviewData } from 'utils/common';
import dayjs from 'dayjs';
import DateTimeStartEnd from 'components/dateTimeStartEnd';

const ViewEvent = () => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [eventOptions, setEventOptions] = useState<EventOptionBodyWithVotes[]>(
    []
  );
  const [loadingNewOption, setLoadingNewOption] = useState<boolean>(false);
  const params = useParams();
  const [showAddOptionForm, setShowAddOptionForm] = useState<boolean>(false);
  const [editOptionInfo, setEditOptionInfo] =
    useState<EventOptionBodyWithVotes | null>(null);
  const [editOptionPos, setEditOptionPos] = useState<number>(-1);
  const [startDate, setStartDate] = useState<Date>(
    dayjs().add(1, 'hour').toDate()
  );
  const [endDate, setEndDate] = useState<Date>(dayjs().add(2, 'hour').toDate());

  const queryParams = new URLSearchParams(window.location.search);
  const cached = queryParams.get('cached');

  useEffect(() => {
    if (params.id) {
      console.log('event_id from param: ', params.id);
      if (cached) {
        const cachedEvent = localStorage.getItem(`event-${params.id}`);
        if (cachedEvent) {
          const event: EventResponse = JSON.parse(cachedEvent);
          setTitle(event?.title || '');
          setEventOptions(event?.options || []);

          localStorage.removeItem(`event-${params.id}`);
          return;
        }
      }

      GetEvent(params.id)
        .then((event: EventResponse) => {
          if (!event) {
            // Maybe 404 if event not found?
            throw new Error(`Event not found - ${params.id}!`);
          }
          setTitle(event.title);
          setEventOptions(event.options);
        })
        .catch((err) => console.error(err));
    }
  }, [params.id, cached]);

  useEffect(() => {
    if (startDate && endDate && params.id) {
      const req: UpdateEventRequest = {
        title,
        description,
        eventStart: startDate.toISOString(),
        eventEnd: endDate.toISOString(),
      };
      UpdateEvent(params.id, req);
    }
  }, [startDate, endDate, params.id]);

  if (!params.id) {
    return <h1 className="text-slate-200 mx-auto">404 Event Not Found</h1>;
  }

  const createOption = async (option: EventOptionBody) => {
    setLoadingNewOption(true);
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
    // editing
    if (editOptionPos >= 0) {
      const newOption = newEvtOptions[editOptionPos];
      UpdateOption(newOption.id, option).then((opt) => {
        newEvtOptions.splice(editOptionPos, 1, opt);
        setEditOptionPos(-1);
        console.log(newEvtOptions);
        setEventOptions(newEvtOptions);
        setLoadingNewOption(false);
      });
    } else {
      // creating
      const createOptionReq: CreateEventOptionRequest = {
        eventId: params.id || '',
        option,
      };
      CreateOption(createOptionReq).then((opt) => {
        newEvtOptions.unshift(opt);
        setEventOptions(newEvtOptions);
        setLoadingNewOption(false);
      });
    }
    setEditOptionInfo(null);
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

  return (
    <div className="view-event-container min-h-full">
      <div className="header-container bg-indigo-600 pb-20">
        <header className="py-10">
          <Title title={title} setTitle={setTitle} />
          {description && (
            <Description
              description={description}
              setDescription={setDescription}
            />
          )}
          <DateTimeStartEnd
            startDate={startDate}
            endDate={endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
          />
        </header>
      </div>
      <main className="-mt-16 pb-8">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          {/* Main 3 column grid */}
          <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-3 lg:gap-8">
            {/* Left column */}
            <div className="grid grid-cols-1 gap-4 lg:col-span-2">
              <div className="overflow-hidden rounded-lg bg-white shadow flex flex-col items-center">
                <div className="p-6">
                  <UpdateEventBody
                    eventOptions={eventOptions}
                    setEventOptions={setEventOptions}
                    editEventOptions={handleEdit}
                    delEventOptions={handleDelete}
                  />
                </div>
                <button
                  type="button"
                  className="w-32 my-9 inline-flex items-center gap-x-1.5 rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                  onClick={() => setShowAddOptionForm(true)}
                >
                  <PlusIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
                  Add option
                </button>
              </div>
            </div>
            {/* Right column */}
            <div className="grid grid-cols-1 gap-4">
              <div className="overflow-hidden rounded-lg bg-white shadow">
                <div className="p-6">
                  <MembersModal />
                </div>
              </div>
              <div className="overflow-hidden rounded-lg bg-white shadow">
                <div className="p-6">
                  <NewComment />
                </div>
              </div>
              <div className="overflow-hidden rounded-lg bg-white shadow">
                <div className="p-6 overflow-auto mx-h-[30rem]">
                  <Comments />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
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

export default ViewEvent;

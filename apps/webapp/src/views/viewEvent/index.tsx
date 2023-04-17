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
  GetEventCommentsResponse,
  CreateEventCommentResponse,
  GetEventMembersResponse,
} from '@event-planner/types/src';
import { GetEvent, UpdateEvent } from 'apis/event';
import { CreateOption, UpdateOption } from 'apis/eventOptions';
import { GetLinkPreviewData } from 'utils/common';
import dayjs from 'dayjs';
import DateTimeStartEnd from 'components/dateTimeStartEnd';
import { GetComments } from 'apis/comments';
import { GetMembers } from 'apis/members';

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
  const [commentsPage, setCommentsPage] = useState<
    GetEventCommentsResponse | undefined
  >();
  const [membersPage, setMembersPage] = useState<GetEventMembersResponse | undefined>();

  const queryParams = new URLSearchParams(window.location.search);
  const cached = queryParams.get('cached');

  const fetchComments = () => {
    if (!params.id) return;
    // TODO make use of pagination
    GetComments({
      eventId: params.id,
      limit: 100,
      offset: 0,
    }).then(setCommentsPage);
  }

  const fetchMembers = () => {
    if (!params.id) return;
    // TODO make use of pagination
    GetMembers({
      eventId: params.id,
      limit: 100,
      offset: 0,
    }).then(setMembersPage);
  }

  useEffect(() => {
    if (params.id) {
      if (cached) {
        const cachedEvent = localStorage.getItem(`event-${params.id}`);
        if (cachedEvent) {
          const event: EventResponse = JSON.parse(cachedEvent);
          if (event) {
            const { title, description, options, eventStart, eventEnd } = event;
            setTitle(title || '');
            setDescription(description || '');
            setEventOptions(options || []);
            setStartDate(new Date(eventStart));
            setEndDate(new Date(eventEnd));
          }
          localStorage.removeItem(`event-${params.id}`);
          return;
        }
      }

      GetEvent(params.id)
        .then((event: EventResponse) => {
          if (!event) {
            // TODO: Maybe 404 if event not found? -- Yes, redir to 404 page, we dont have now
            throw new Error(`Event not found - ${params.id}!`);
          } else {
            const { title, description, options, eventStart, eventEnd } = event;
            setTitle(title || '');
            setDescription(description || '');
            setEventOptions(options || []);
            setStartDate(new Date(eventStart));
            setEndDate(new Date(eventEnd));
            fetchComments();
            fetchMembers();
          }
        })
        .catch((err) => console.error(err));

      // this will need to be a poll
      fetchComments();
    }
  }, [params.id, cached]);

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

  const handleUpdateTitle = (title: string) => {
    if (params.id) {
      const req: UpdateEventRequest = {
        title,
      };
      UpdateEvent(params.id, req).then((event) => {
        if (event) {
          setTitle(event.title);
        }
      });
    }
  };

  const handleUpdateDescription = (description: string) => {
    if (params.id) {
      const req: UpdateEventRequest = {
        description,
      };
      UpdateEvent(params.id, req).then((event) => {
        if (event) {
          setDescription(event.description);
        }
      });
    }
  };

  const handleUpdateSchedule = (start: Date, end: Date) => {
    if (params.id) {
      const _start = dayjs(start);
      let _end = dayjs(end);
      if (_start.isAfter(_end)) _end = _start.add(1, 'hour');

      const req: UpdateEventRequest = {
        eventStart: _start.toISOString(),
        eventEnd: _end.toISOString(),
      };
      UpdateEvent(params.id, req).then((event) => {
        if (event && event.eventStart && event.eventEnd) {
          setStartDate(new Date(event.eventStart));
          setEndDate(new Date(event.eventEnd));
        }
      });
    }
  };

  const handleEditOption = (position: number) => {
    setEditOptionPos(position);
    setEditOptionInfo(() => {
      setShowAddOptionForm(true);
      return eventOptions[position];
    });
  };

  const handleDeleteOption = (position: number) => {
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
          <Title title={title} setTitle={handleUpdateTitle} />
          {description && (
            <Description
              description={description}
              setDescription={handleUpdateDescription}
            />
          )}
          <DateTimeStartEnd
            startDate={startDate}
            endDate={endDate}
            handleUpdateSchedule={handleUpdateSchedule}
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
                    editEventOptions={handleEditOption}
                    delEventOptions={handleDeleteOption}
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
                  { membersPage && <MembersModal data={membersPage.content} totalCount={membersPage.pageInfo.totalCount} />}
                </div>
              </div>
              <div className="overflow-hidden rounded-lg bg-white shadow">
                <div className="p-6">
                  <NewComment onSuccessfullCreate={fetchComments} />
                </div>
              </div>
              <div className="overflow-hidden rounded-lg bg-white shadow">
                <div className="p-6 overflow-auto mx-h-[30rem]">
                <Comments comments={commentsPage?.content.map(c => {
                    return {
                      createdAt: c.createdAt,
                      createdBy: c.commenterInfo.name.trim() === "" ? c.commenterInfo.email : c.commenterInfo.name,
                      content: c.content
                    }
                  }) || []} />
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

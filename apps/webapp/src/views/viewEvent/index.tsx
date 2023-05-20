import { useState, useEffect, useCallback, useMemo } from 'react';
import UpdateEventBody from 'components/updateEventBody';
import Comments from 'components/comments';
import NewComment from 'components/newComment';
import { useNavigate, useParams } from 'react-router-dom';
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
  GetEventMembersResponse,
} from '@event-planner/types/src';
import { GetLinkPreviewData, dateToLocalTimeZoneDate } from 'utils/common';
import dayjs from 'dayjs';
import DateTimeStartEnd from 'components/dateTimeStartEnd';
import useEventOptionsApi from 'apis/eventOptions';
import useEventsApi from 'apis/event';
import useCommentsApi from 'apis/comments';
import useMembersApi from 'apis/members';
import EventActionDropdown, {
  EventActionsType,
} from 'components/eventActionDropdown';
import SelectFinalEventModal from 'components/selectFinalEventModal';
import LinkPreview from 'components/linkPreview';
import { routes } from 'const/routes';
import ShareEventModal from 'components/shareEventModal';
import RequireLoginModal from 'components/requireLoginModal';
import { useStytchUser } from '@stytch/react';

const ViewEvent = () => {
  const { user } = useStytchUser();
  const eventsApi = useEventsApi();
  const membersApi = useMembersApi();
  const eventOptionsApi = useEventOptionsApi();

  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [eventOptionId, setEventOptionId] = useState<string>('');
  const [openMarkCompleteModal, setOpenMarkCompleteModal] =
    useState<boolean>(false);
  const [openShareEventModal, setOpenShareEventModal] =
    useState<boolean>(false);
  const [eventOptions, setEventOptions] = useState<EventOptionBodyWithVotes[]>(
    []
  );
  const [loadingNewOption, setLoadingNewOption] = useState<boolean>(false);
  const [showAddOptionForm, setShowAddOptionForm] = useState<boolean>(false);
  const [editOptionInfo, setEditOptionInfo] =
    useState<EventOptionBodyWithVotes | null>(null);
  const [finalOptionInfo, setFinalOptionInfo] =
    useState<EventOptionBodyWithVotes | null>(null);
  const [editOptionPos, setEditOptionPos] = useState<number>(-1);
  const [startDate, setStartDate] = useState<Date>(
    dayjs().add(1, 'hour').toDate()
  );
  const [endDate, setEndDate] = useState<Date>(dayjs().add(2, 'hour').toDate());
  const [commentsPage, setCommentsPage] = useState<
    GetEventCommentsResponse | undefined
  >();
  const [membersPage, setMembersPage] = useState<
    GetEventMembersResponse | undefined
  >();
  const [showRequireLoginModal, setShowRequireLoginModal] =
    useState<boolean>(false);

  const navigate = useNavigate();
  const params = useParams();
  const queryParams = new URLSearchParams(window.location.search);
  const cached = queryParams.get('cached');

  const showEventBody = useMemo(() => {
    return (isComplete && finalOptionInfo) || !isComplete;
  }, [isComplete, finalOptionInfo]);

  const fetchMembers = useCallback(() => {
    if (!params.id) return;
    // TODO make use of pagination
    membersApi
      .Get({
        eventId: params.id,
        limit: 100,
        offset: 0,
      })
      .then(setMembersPage);
  }, [params.id, membersApi]);

  const getEventInfoApi = useCallback(() => {
    if (!params.id) return;
    eventsApi
      .Get(params.id)
      .then((event: EventResponse) => {
        if (!event) {
          // TODO: Maybe 404 if event not found? -- Yes, redir to 404 page, we dont have now
          throw new Error(`Event not found - ${params.id}!`);
        } else {
          const {
            title,
            description,
            options,
            eventStart,
            eventEnd,
            planned,
            eventOptionId,
            members,
            comments,
          } = event;
          setEventOptionId(eventOptionId || '');
          setIsComplete(planned);
          setTitle(title || '');
          setDescription(description || '');
          setEventOptions(options.content);
          setMembersPage(members);
          setCommentsPage(comments);
          setStartDate(dateToLocalTimeZoneDate(new Date(eventStart)).toDate());
          setEndDate(dateToLocalTimeZoneDate(new Date(eventEnd)).toDate());

          if (eventOptionId) {
            const option = options.content.find(
              (option) => option.id === eventOptionId
            );
            if (option) setFinalOptionInfo(option);
          }
        }
      })
      .catch((err) => console.error(err));
  }, [params.id, eventsApi]);

  useEffect(() => {
    if (params.id) {
      if (cached) {
        const cachedEvent = localStorage.getItem(`event-${params.id}`);
        if (cachedEvent) {
          const event: EventResponse = JSON.parse(cachedEvent);
          if (event) {
            const {
              title,
              description,
              options,
              eventStart,
              eventEnd,
              planned,
              eventOptionId,
              comments,
              members,
            } = event;
            setEventOptionId(eventOptionId || '');
            setIsComplete(planned);
            setTitle(title || '');
            setDescription(description || '');
            setEventOptions(options.content);
            setCommentsPage(comments);
            setMembersPage(members);
            setStartDate(
              dateToLocalTimeZoneDate(new Date(eventStart)).toDate()
            );
            setEndDate(dateToLocalTimeZoneDate(new Date(eventEnd)).toDate());
          }
          localStorage.removeItem(`event-${params.id}`);
          return;
        }
      }

      getEventInfoApi();
    }
  }, []);

  if (!params.id) {
    return <h1 className="text-slate-200 mx-auto">404 Event Not Found</h1>;
  }

  const isLoggedIn: boolean = user !== null && user !== undefined;

  const wrapWithRequireLoggedIn = (callback: any) => {
    if (!isLoggedIn) {
      return () => {
        setShowRequireLoginModal(true);
      };
    }
    return callback;
  };

  const requireLoogedIn = (): boolean => {
    console.log("Checking if looged in!");
    if (!isLoggedIn) {
      setShowRequireLoginModal(true);
      return false;
    }
    return true;
  };

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
      eventOptionsApi.Update(newOption.id, option).then((opt) => {
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
      eventOptionsApi.Create(createOptionReq).then((opt) => {
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
      eventsApi.Update(params.id, req).then((event) => {
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
      eventsApi.Update(params.id, req).then((event) => {
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
      eventsApi.Update(params.id, req).then((event) => {
        if (event && event.eventStart && event.eventEnd) {
          setStartDate(
            dateToLocalTimeZoneDate(new Date(event.eventStart)).toDate()
          );
          setEndDate(
            dateToLocalTimeZoneDate(new Date(event.eventEnd)).toDate()
          );
        }
      });
    }
  };

  const handleUpdateStatus = (eventOptionId: string, planned: boolean) => {
    if (params.id) {
      const req: UpdateEventRequest = {
        planned,
      };
      if (eventOptionId.length) req.eventOptionId = eventOptionId;

      eventsApi.Update(params.id, req).then((event) => {
        if (event) {
          setEventOptionId(event.eventOptionId || '');
          setIsComplete(event.planned);
          getEventInfoApi();
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

  const handleEventDropdownActions = (action: EventActionsType) => {
    switch (action) {
      case EventActionsType.status:
        handleEventActionStatus();
        break;
      case EventActionsType.calendar:
        handleEventActionCalendar();
        break;
      case EventActionsType.share:
        handleEventActionShare();
        break;
      case EventActionsType.delete:
        handleEventActionDelete();
        break;
    }
  };

  const handleEventActionStatus = () => {
    if (isComplete) {
      // if status is complete, change to planning (false), set eventOptionId ""
      handleUpdateStatus('', false);
    } else {
      // if status is planning, change to complete (true)
      if (eventOptions.length <= 1) {
        // if only 1 or 0 options, just select that one
        handleUpdateStatus(eventOptions[0] ? eventOptions[0].id : '', true);
        // if multiple options, user needs to select one
        setOpenMarkCompleteModal(true);
      }
    }
  };

  const handleEventActionCalendar = () => {
    console.log('send calendar here');
  };

  const handleEventActionShare = () => {
    setOpenShareEventModal(true);
  };

  const handleEventActionDelete = async () => {
    if (!params.id) return;
    try {
      await eventsApi.Delete(params.id);
      navigate(routes.HOME);
    } catch (err) {
      // TODO: maybe show err toast here
    }
  };

  const showCompleteStatusEventOptionBody = () => {
    if (!finalOptionInfo) return null;
    const {
      title,
      description,
      linkPreviewImgUrl,
      linkUrl,
      linkPreviewTitle,
      linkPreviewDesc,
      votes,
    } = finalOptionInfo;
    return (
      <div className="max-w-xl">
        <h3 className="text-md font-medium text-gray-900">{title}</h3>
        <div className="mt-1 flex flex-grow flex-col">
          <p className="text-md text-gray-500 pb-3">{description}</p>
          {linkPreviewImgUrl && (
            <LinkPreview
              linkUrl={linkUrl}
              linkPreviewTitle={linkPreviewTitle}
              linkPreviewDesc={linkPreviewDesc}
              linkPreviewImgUrl={linkPreviewImgUrl}
            />
          )}
          <p className="mt-4 flex items-center text-md font-bold text-indigo-600">
            {votes + ' votes'}
          </p>
        </div>
      </div>
    );
  };

  const showPlanningStatusEventOptionBody = () => {
    return (
      <div>
        <UpdateEventBody
          eventOptions={eventOptions}
          setEventOptions={setEventOptions}
          editEventOptions={handleEditOption}
          delEventOptions={handleDeleteOption}
          preHandleVote={requireLoogedIn}
        />
        <button
          type="button"
          className="w-32 my-9 inline-flex items-center gap-x-1.5 rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          onClick={wrapWithRequireLoggedIn(() => setShowAddOptionForm(true))}
        >
          <PlusIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
          Add option
        </button>
      </div>
    );
  };

  return (
    <div className="view-event-container min-h-full">
      <div className="header-container bg-indigo-600 pb-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="float-right mt-3">
            {isLoggedIn && (
              <EventActionDropdown
                callBack={wrapWithRequireLoggedIn(handleEventDropdownActions)}
                status={isComplete}
              />
            )}
          </div>
        </div>
        <header className="py-10">
          <Title
            title={title}
            setTitle={handleUpdateTitle}
            editable={!isComplete && isLoggedIn}
          />
          {description && (
            <Description
              description={description}
              setDescription={handleUpdateDescription}
              editable={!isComplete && isLoggedIn}
            />
          )}
          <DateTimeStartEnd
            startDate={startDate}
            endDate={endDate}
            handleUpdateSchedule={handleUpdateSchedule}
            editable={!isComplete && isLoggedIn}
          />
        </header>
      </div>
      <main className="-mt-16 pb-8">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          {/* Main 3 column grid */}
          <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-3 lg:gap-8">
            {/* Left column */}
            {showEventBody ? (
              <div className="grid grid-cols-1 gap-4 lg:col-span-2">
                <div className="overflow-hidden rounded-lg bg-white shadow flex flex-col items-center">
                  <div className="p-10">
                    {isComplete
                      ? showCompleteStatusEventOptionBody()
                      : showPlanningStatusEventOptionBody()}
                  </div>
                </div>
              </div>
            ) : null}
            {/* Right column */}
            <div className="grid grid-cols-1 gap-4">
              <div className="overflow-hidden rounded-lg bg-white shadow">
                <div className="p-6">
                  {membersPage && (
                    <MembersModal
                      data={membersPage.content}
                      totalCount={membersPage.pageInfo.totalCount}
                    />
                  )}
                </div>
              </div>
              {commentsPage && (
                <Comments
                  initialCommentsPage={commentsPage}
                  allowSubmission={requireLoogedIn}
                />
              )}
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
      <SelectFinalEventModal
        open={openMarkCompleteModal}
        setOpen={setOpenMarkCompleteModal}
        eventOptionId={eventOptionId}
        setEventOptionId={setEventOptionId}
        eventOptions={eventOptions}
        handleUpdateStatus={handleUpdateStatus}
      />
      <ShareEventModal
        open={openShareEventModal}
        setOpen={setOpenShareEventModal}
        url={window.location.href}
      />
      <RequireLoginModal
        show={showRequireLoginModal}
        onClose={() => setShowRequireLoginModal(false)}
        eventId={params.id}
      />
    </div>
  );
};

export default ViewEvent;

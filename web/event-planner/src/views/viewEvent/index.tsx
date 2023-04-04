import { useState, useEffect } from "react";
import UpdateEventBody from "components/updateEventBody";
import { EventOption } from "types";
import Comments from "components/comments";
import NewComment from "components/newComment";
import { useParams } from "react-router-dom";
import MembersModal from "components/membersModal";
import { EventOptionData } from "mockData";
import Title from "components/title";
import EditEventOptionModal from "components/editEventOptionModal";
import { PlusIcon } from "@heroicons/react/24/outline";
import { GetEvent } from "apis/event";
import _ from "lodash";

const ViewEvent = () => {
  const [eventOptions, setEventOptions] =
    useState<EventOption[]>(EventOptionData);
  const params = useParams();
  const [title, setTitle] = useState<string>(
    "Where do we want to stay in Vegas?"
  );
  const [showAddOptionForm, setShowAddOptionForm] = useState<boolean>(false);
  const [editOptionInfo, setEditOptionInfo] = useState<EventOption | null>(
    null
  );
  const [editOptionPos, setEditOptionPos] = useState<number>(-1);

  useEffect(() => {
    if (!params.id) {
      return;
    }

    console.log("event_id from param: ", params.id);
    GetEvent(params.id).then((event) => {
      if (!event) {
        return;
      }

      setTitle(event.title);

      const options = event.options.map((opt) => {
        // the type don't match so destructure and assign
        const { description, linkPreview, ...rest } = opt;
        const link = _.get(linkPreview, "link") ?? "";
        return { ...opt, desc: description ?? "", linkPreview: { link } };
      });
      setEventOptions(options);
    });
  });

  const createOption = (option: EventOption) => {
    // TODO:
    // 1) call backend to get link preview infos
    // 2) set preview info in data structure
    const newEvtOptions = [...eventOptions];
    if (editOptionPos >= 0) {
      newEvtOptions.splice(editOptionPos, 1, option);
      setEditOptionPos(-1);
    } else {
      newEvtOptions.unshift(option);
    }
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

  return (
    <div className="view-event-container min-h-full">
      <div className="header-container bg-indigo-600 pb-20">
        <header className="py-10">
          <Title title={title} setTitle={setTitle} />
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
                    voteOptions={eventOptions}
                    setVoteOptions={setEventOptions}
                    editVoteOptions={handleEdit}
                    delVoteOptions={handleDelete}
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
      />
    </div>
  );
};

export default ViewEvent;

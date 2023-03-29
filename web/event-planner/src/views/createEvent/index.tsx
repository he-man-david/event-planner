import { useState } from "react";
import { PlusIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import EditEventOptionModal from "components/editEventOptionModal";
import CreateEventBody from "components/createEventBody";
import { EventOption } from "types";

const CreateEvent = () => {
  const [eventTitle, setEventTitle] = useState<string>("");
  const [eventOptions, setEventOptions] = useState<EventOption[]>([]);
  const [showAddOptionForm, setShowAddOptionForm] = useState<boolean>(false);
  const [editOptionInfo, setEditOptionInfo] = useState<EventOption | null>(
    null
  );
  const [editOptionPos, setEditOptionPos] = useState<number>(-1);

  const createEvent = () => {
    // TODO: create the event here
  };

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

  const submitButton = () => {
    return (
      <div className="mx-auto h-10 max-w-6xl mb-6">
        <button
          type="button"
          className="relative lg:float-right inline-flex items-center gap-x-1.5 rounded-md bg-emerald-500 mx-7 px-3 py-2 text-lg font-semibold text-white shadow-sm hover:bg-emerald-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
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
                className="block w-full h-10 md:h-12 lg:h-14 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:italic placeholder:text-gray-400 lg:placeholder:text-3xl md:placeholder:text-2xl sm:placeholder:text-1xl lg:text-3xl md:text-2xl sm:text-1xl focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:leading-6"
                placeholder="The perfect Airbnb for Vegas!!"
                onChange={(e) => setEventTitle(e.target.value)}
                value={eventTitle}
              />
            </div>
          </div>
        </header>
      </div>
      <main className="-mt-32">
        <div className="mx-auto max-w-6xl px-4 p-8 sm:px-6 lg:px-8 bg-white border rounded-lg mb-5">
          <p className="mb-6 text-lg lg:text-2xl">
            Create event options below for voting
          </p>
          <button
            type="button"
            className="relative mb-9 inline-flex items-center gap-x-1.5 rounded-md bg-indigo-500 mx-7 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            onClick={() => setShowAddOptionForm(true)}
          >
            <PlusIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
            Add option
          </button>
          <div>
            <CreateEventBody
              voteOptions={eventOptions}
              setVoteOptions={setEventOptions}
              editVoteOptions={handleEdit}
              delVoteOptions={handleDelete}
              editMode
            />
          </div>
        </div>
      </main>
      {submitButton()}
      <EditEventOptionModal
        open={showAddOptionForm}
        setOpen={handleOptionModalDisplay}
        createOption={createOption}
        editOptionInfo={editOptionInfo}
      />
    </div>
  );
};

export default CreateEvent;

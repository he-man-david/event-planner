import { useState } from "react";
import { PlusIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import CreateEventOptionModal from "components/createEventOptionModal";
import "./styles.css";

const CreateEvent = () => {
  const [showAddOptionForm, setShowAddOptionForm] = useState<boolean>(false);

  const createEvent = () => {};

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
          {submitButton()}
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <label
              htmlFor="event-title"
              className="block lg:text-4xl md:text-3xl text-2xl font-medium leading-6 text-white mb-5"
            >
              Event Title:
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="event-title"
                id="event-title"
                className="block w-full lg:h-20 md:h-18 sm:h-16 h-12 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:italic placeholder:text-gray-400 lg:placeholder:text-4xl md:placeholder:text-3xl sm:placeholder:text-2xl lg:text-4xl md:text-3xl sm:text-2xl focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:leading-6"
                placeholder="The perfect Airbnb for Vegas!!"
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
            className="relative inline-flex items-center gap-x-1.5 rounded-md bg-indigo-500 mx-7 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            onClick={() => setShowAddOptionForm(true)}
          >
            <PlusIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
            Event Option
          </button>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-2">
            show EventBody here
          </div>
        </div>
      </main>
      {submitButton()}
      <CreateEventOptionModal
        open={showAddOptionForm}
        setOpen={setShowAddOptionForm}
      />
    </div>
  );
};

export default CreateEvent;

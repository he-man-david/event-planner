import { PlusIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { TitleParam } from './types';

const Title = ({ title, setTitle }: TitleParam) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [value, setValue] = useState<string>(title);

  const showEdit = () => {
    return (
      <div className="flex flex-col">
        <div className="mx-auto lg:w-[50rem] w-full px-4 sm:px-6 lg:px-8">
          <label
            htmlFor="event-title"
            className="block lg:float-left md:float-left text-2xl font-medium leading-6 text-white mb-5"
          >
            Event Title:
          </label>
          <input
            type="text"
            name="event-title"
            id="event-title"
            className="block w-80 h-10 md:h-12 md:w-full lg:h-14 lg:w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:italic placeholder:text-gray-400 lg:placeholder:text-3xl md:placeholder:text-2xl sm:placeholder:text-1xl lg:text-3xl md:text-2xl sm:text-1xl focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:leading-6"
            placeholder="The perfect Airbnb for Vegas!!"
            onChange={(e) => setValue(e.target.value)}
            value={value}
          />
        </div>
        <div className="mt-4 flex justify-end mx-auto lg:w-[50rem] sm:w-full px-4 sm:px-6 lg:px-8">
          <button
            type="button"
            className="inline-flex justify-center rounded-md bg-emerald-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
            onClick={() => {
              setEditMode(false);
              setTitle(value);
            }}
          >
            <PlusIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
            Save
          </button>
          <button
            type="button"
            className="ml-5 inline-flex justify-center border-none bg-transparent px-3 py-2 text-sm font-semibold text-white hover:text-slate-300 hover:underline"
            onClick={() => {
              setEditMode(false);
              setValue(title);
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {editMode ? (
        showEdit()
      ) : (
        <div className="flex justify-center">
          <h1 className="topic-title text-3xl font-bold tracking-tight text-white">
            {title}
          </h1>
          <div>
            <PencilSquareIcon
              className="h-4 w-4 ml-5 hover:cursor-pointer text-slate-100 hover:text-slate-300"
              aria-hidden="true"
              onClick={() => setEditMode(true)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Title;

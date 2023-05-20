import { PlusIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { DescriptionParam } from './types';

const Description = ({
  description,
  setDescription,
  editable,
}: DescriptionParam) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [value, setValue] = useState<string>(description);

  const showEdit = () => {
    return (
      <div className="flex flex-col">
        <div className="mx-auto lg:w-[50rem] w-full px-4 sm:px-6 lg:px-8">
          <label
            htmlFor="comment"
            className="block text-sm font-medium leading-6 text-white"
          >
            Description
          </label>
          <div className="mt-2">
            <textarea
              rows={2}
              name="comment"
              id="comment"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
        </div>
        <div className="mt-4 flex justify-end mx-auto lg:w-[50rem] sm:w-full px-4 sm:px-6 lg:px-8">
          <button
            type="button"
            className="inline-flex justify-center rounded-md bg-emerald-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
            onClick={() => {
              setEditMode(false);
              setDescription(value);
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
              setValue(description);
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-5">
      {editMode ? (
        showEdit()
      ) : (
        <div className="flex justify-center">
          <h1 className="topic-title text-1xl tracking-tight text-white">
            {description}
          </h1>
          {editable && (
            <div>
              <PencilSquareIcon
                className="h-4 w-4 ml-5 hover:cursor-pointer text-slate-100 hover:text-slate-300"
                aria-hidden="true"
                onClick={() => setEditMode(true)}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Description;

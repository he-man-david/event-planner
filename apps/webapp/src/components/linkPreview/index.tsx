import { ArrowUpRightIcon } from '@heroicons/react/24/outline';

import { EventOption } from '@prisma/client';

const LinkPreview = ({
  linkPreviewTitle: title,
  linkPreviewDesc: desc,
  linkUrl: link,
  linkPreviewImgUrl: imageUrl,
}: EventOption) => {
  return (
    <div className="w-full group relative">
      <div className="aspect-w-4 aspect-h-3 overflow-hidden rounded-lg bg-gray-100">
        <img
          src={imageUrl || ''}
          alt={title || 'No image url'}
          className="object-cover object-center"
        />
        <div
          className="flex items-end p-4 opacity-0 group-hover:opacity-100"
          aria-hidden="true"
        >
          <a
            href={link}
            target="_blank"
            rel="noreferrer"
            className="w-full rounded-md bg-white bg-opacity-75 py-2 px-4 text-center text-sm font-medium text-gray-900 backdrop-blur backdrop-filter hover:bg-indigo-600 hover:text-white flex items-center justify-center"
          >
            <p>Open</p>
            <ArrowUpRightIcon className="ml-2 h-3 w-3" aria-hidden="true" />
          </a>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between space-x-8 text-base font-medium text-gray-900">
        <h3>{title}</h3>
      </div>
      <p className="mt-1 text-sm text-gray-500">{desc}</p>
    </div>
  );
};

export default LinkPreview;

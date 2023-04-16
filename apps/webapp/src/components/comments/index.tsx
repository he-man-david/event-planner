import { UserCircleIcon } from '@heroicons/react/24/outline';
import dayjs from 'dayjs';

export type CommentsProps = {
  comments: Array<{
    createdBy: string;
    createdAt: Date;
    content: string;
  }>;
};

const Comments = (props?: CommentsProps) => {
  return (
    <div className="flow-root">
      <ul className="-mb-8">
        {props?.comments.map((commentItem, index) => (
          <li key={index}>
            <div className="relative pb-8">
              {index !== props.comments.length - 1 ? (
                <span
                  className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200"
                  aria-hidden="true"
                />
              ) : null}
              <div className="relative flex items-start space-x-3">
                <div className="relative">
                  {/* <img
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-400 ring-8 ring-white"
                    src={commentItem.userImageUrl}
                    alt=""
                  /> */}
                  <UserCircleIcon className="h-10 w-10 rounded-full" />
                </div>
                <div className="min-w-0 flex-1 text-start">
                  <div>
                    <div className="text-sm">
                      <p className="font-medium text-gray-900">
                        {commentItem.createdBy}
                      </p>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">
                      Commented {dayjs(commentItem.createdAt).toISOString()}
                    </p>
                  </div>
                  <div className="mt-2 text-sm text-gray-700">
                    <p>{commentItem.content}</p>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Comments;

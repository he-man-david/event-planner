import { GetEventCommentsResponse } from '@event-planner/types/src';
import dayjs from 'dayjs';
import Avatar from 'react-avatar';

export type CommentsProps = {
  commentsPage: GetEventCommentsResponse;
};

const Comments = ({ commentsPage }: CommentsProps) => {
  const comments = commentsPage.content.map((c) => {
    return {
      createdAt: c.createdAt,
      createdBy:
        c.commenterInfo.name.trim() === ''
          ? c.commenterInfo.email
          : c.commenterInfo.name,
      content: c.content,
    };
  });

  return (
    <div className="flow-root">
      <ul className="-mb-8">
        {comments.map(({ createdBy, createdAt, content }, idx) => (
          <li key={idx}>
            <div className="relative pb-8">
              {idx !== comments.length - 1 ? (
                <span
                  className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200"
                  aria-hidden="true"
                />
              ) : null}
              <div className="relative flex items-start space-x-3">
                <div className="relative">
                  <Avatar key={idx} name={createdBy} round={true} size="45" />
                </div>
                <div className="min-w-0 flex-1 text-start">
                  <div>
                    <div className="text-sm">
                      <p className="font-medium text-gray-900">{createdBy}</p>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">
                      Commented {dayjs(createdAt).format('YYYY-MM-DD')}
                    </p>
                  </div>
                  <div className="mt-2 text-sm text-gray-700">
                    <p>{content}</p>
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

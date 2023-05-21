import { GetEventCommentsResponse } from '@event-planner/types/src';
import useCommentsApi from 'apis/comments';
import NewComment from 'components/newComment';
import dayjs from 'dayjs';
import { useState, useCallback } from 'react';
import Avatar from 'react-avatar';
import { useParams } from 'react-router-dom';
import { useStytchUser } from '@stytch/react';

export type CommentsProps = {
  initialCommentsPage: GetEventCommentsResponse;
  allowSubmission: () => boolean;
};

const Comments = ({ initialCommentsPage, allowSubmission }: CommentsProps) => {
  const { user } = useStytchUser();
  const commentsApi = useCommentsApi();
  const params = useParams();
  const [comments, setComments] = useState<GetEventCommentsResponse['content']>(
    initialCommentsPage.content
  );
  const eventId = params.id;

  const [pageInfo, setPageInfo] = useState<
    GetEventCommentsResponse['pageInfo']
  >(initialCommentsPage.pageInfo);

  const fetchComments = useCallback(() => {
    if (!allowSubmission() || !eventId) return;

    commentsApi
      .Get({
        eventId,
        limit: pageInfo.size,
        offset: pageInfo.offset + pageInfo.size, // we need to add size to get to next page
      })
      .then((commentsPage) => {
        const updatedComments = [...comments, ...commentsPage.content];
        setComments(updatedComments);
        setPageInfo(commentsPage.pageInfo);
      });
  }, [params.id, pageInfo]);

  const postComment = async (comment: string) => {
    console.log();
    if (!allowSubmission() || !eventId || !user) return Promise.resolve(false);

    return await commentsApi
      .Create({
        createdBy: user.user_id,
        content: comment,
        eventId,
      })
      .then((res) => {
        const updatedComments = [res, ...comments];
        const updatedPageInfo = {
          ...pageInfo,
          offset: pageInfo.offset + 1,
          totalCount: pageInfo.totalCount + 1,
        };
        setComments(updatedComments);
        setPageInfo(updatedPageInfo);
        return true;
      });
  };

  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="overflow-hidden rounded-lg bg-white shadow">
        <div className="p-6">
          <NewComment onSubmit={postComment} />
        </div>
      </div>
      {comments.length ? (
        <div className="pt-6 px-4 overflow-hidden rounded-lg bg-white shadow grid place-items-center">
          <div className="pt-3 overflow-auto max-h-[17rem] w-full">
            <div className="flow-root">
              <ul className="-mb-8">
                {comments
                  .map((c) => {
                    return {
                      createdAt: c.createdAt,
                      createdBy:
                        c.commenterInfo.name.trim() === ''
                          ? c.commenterInfo.email
                          : c.commenterInfo.name,
                      content: c.content,
                    };
                  })
                  .map(({ createdBy, createdAt, content }, idx) => (
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
                            <Avatar
                              key={idx}
                              name={createdBy}
                              round={true}
                              size="45"
                            />
                          </div>
                          <div className="min-w-0 flex-1 text-start">
                            <div>
                              <div className="text-sm">
                                <p className="font-medium text-gray-900">
                                  {createdBy}
                                </p>
                              </div>
                              <p className="mt-0.5 text-sm text-gray-500">
                                Commented{' '}
                                {dayjs(createdAt).format('YYYY-MM-DD h:mm A')}
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
          </div>
          <div className="p-6 content-stretch">
            <button
              type="submit"
              className={
                pageInfo.hasNext
                  ? 'inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600f'
                  : 'inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-70'
              }
              onClick={fetchComments}
              disabled={!pageInfo.hasNext}
            >
              Load more
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Comments;

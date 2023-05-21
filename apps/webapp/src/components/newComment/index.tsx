import useCommentsApi from 'apis/comments';
import { useState } from 'react';
import { useStytchUser } from '@stytch/react';
import { useParams } from 'react-router-dom';
import { GetEventCommentsResponse } from '@event-planner/types/src';
import Avatar from 'react-avatar';

type NewCommentProps = {
  // setCommentsPage: (comment: GetEventCommentsResponse) => void;
  // onPreSubmit: (e: any) => boolean;
  onSubmit: (comment: string) => Promise<boolean>;
};

const NewComment = ({ onSubmit }: NewCommentProps) => {
  const params = useParams();
  const { user } = useStytchUser();
  // const commentsApi = useCommentsApi();
  const [comment, setComment] = useState<string>('');

  const profileImg = () => {
    const email = user?.emails.length ? user.emails[0].email : '';
    const name = user?.name?.first_name
      ? `${user.name.first_name} ${user.name.middle_name} ${user.name.last_name}`
      : email;
    return <Avatar name={name} round={true} size="45" />;
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onSubmit(comment).then((success) => {
      if (success) {
        setComment('');
      }
    });

    // commentsApi
    //   .Create({
    //     createdBy: user?.user_id,
    //     content: comment,
    //     eventId: params.id,
    //   })
    //   .then((res) => {
    //     setComment('');
    //     const newCommentsPage = { ...commentsPage };
    //     newCommentsPage.content.unshift(res);
    //     setCommentsPage(newCommentsPage);
    //   });
  };

  return (
    <div className="flex items-start space-x-4">
      <div className="flex-shrink-0">{profileImg()}</div>
      <div className="min-w-0 flex-1">
        {/* <form onSubmit={handleSubmit}> */}
        <div className="border-b border-gray-200 focus-within:border-indigo-600">
          <label htmlFor="comment" className="sr-only">
            Add your comment
          </label>
          <textarea
            rows={3}
            name="comment"
            id="comment"
            className="block w-full resize-none border-0 border-b border-transparent p-0 pb-2 text-gray-900 placeholder:text-gray-400 focus:border-indigo-600 focus:ring-0 sm:text-sm sm:leading-6"
            placeholder="Add your comment..."
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />
        </div>
        <div className="flex-shrink-0 pt-2 float-right">
          <button
            type="submit"
            className={
              comment === ''
                ? 'inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-70'
                : 'inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
            }
            onClick={handleSubmit}
            disabled={comment === ''}
          >
            Post
          </button>
        </div>
        {/* </form> */}
      </div>
    </div>
  );
};

export default NewComment;

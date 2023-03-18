import { useEffect } from "react";
import EventBody from "components/eventBody";
import Comments from "components/comments";
import NewComment from "components/newComment";
import { useParams } from "react-router-dom";
import "./styles.css";
import MembersModal from "components/membersModal";

const ViewEvent = () => {
  const params = useParams();

  useEffect(() => {
    console.log("event_id from param: ", params.id);
  });
  return (
    <div className="view-event-container min-h-full">
      <div className="header-container bg-indigo-600 pb-20">
        <header className="py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="topic-title text-3xl font-bold tracking-tight text-white">
              Which Airbnb do yall prefer?
            </h1>
          </div>
        </header>
      </div>
      <main className="-mt-16 pb-8">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          {/* Main 3 column grid */}
          <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-3 lg:gap-8">
            {/* Left column */}
            <div className="grid grid-cols-1 gap-4 lg:col-span-2">
              <div className="overflow-hidden rounded-lg bg-white shadow">
                <div className="p-6">
                  <EventBody />
                </div>
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
    </div>
  );
};

export default ViewEvent;

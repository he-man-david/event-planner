import { useRoutes } from "react-router-dom";
import ViewEvent from "views/viewEvent";
import CreateEvent from "views/createEvent";

const Router = () => {
  let element = useRoutes([
    { path: "/my-events", element: <h1>This is my events page</h1> },
    { path: "/about-us", element: <h1>This is my about us page</h1> },
    { path: "/new-event", element: <CreateEvent /> },
    { path: "/event/:id", element: <ViewEvent /> },
  ]);

  return element;
};

export default Router;

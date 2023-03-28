import { useRoutes, Navigate } from "react-router-dom";
import { useStytchUser } from "@stytch/react";
import ViewEvent from "views/viewEvent";
import CreateEvent from "views/createEvent";
import Login from "views/login";
import Profile from "views/profile";
import Authenticate from "views/authenticate";
import { routes } from "const/routes";

const Router = () => {
  // The useStytchUser hook will return the existing Stytch User object if one exists
  const { user } = useStytchUser();

  let element = useRoutes([
    {
      path: routes.NEW_EVENT,
      element: user ? (
        <CreateEvent />
      ) : (
        <Navigate to="/login?next_route=/new-event" />
      ),
    },
    {
      path: routes.PROFILE,
      element: user ? (
        <Profile />
      ) : (
        <Navigate to="/login?next_route=/profile" />
      ),
    },
    { path: routes.LOGIN, element: <Login /> },
    { path: routes.AUTH, element: <Authenticate /> },
    { path: routes.ABOUT_US, element: <h1>This is about-us page</h1> },
    { path: routes.EVENT_ID, element: <ViewEvent /> },
    {
      path: routes.HOME,
      element: user ? (
        <h1>This is my-events, home page, show all events</h1>
      ) : (
        <Navigate to="/login" />
      ),
    },
  ]);

  return element;
};

export default Router;

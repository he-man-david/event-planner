import { useRoutes, Navigate } from 'react-router-dom';
import { useStytchUser } from '@stytch/react';
import ViewEvent from 'views/viewEvent';
import CreateEvent from 'views/createEvent';
import Login from 'views/login';
import Authenticate from 'views/authenticate';
import MyEvents from 'views/myEvents';
import Calendar from 'views/calendar';
import { routes } from 'const/routes';

const Router = () => {
  // The useStytchUser hook will return the existing Stytch User object if one exists
  const { user } = useStytchUser();

  const element = useRoutes([
    {
      path: routes.NEW_EVENT,
      element: <CreateEvent />,
    },
    { path: routes.LOGIN, element: <Login /> },
    { path: routes.AUTH, element: <Authenticate /> },
    { path: routes.EVENT_ID, element: <ViewEvent /> },
    {
      path: routes.MY_EVENTS,
      element: user ? <MyEvents /> : <Navigate to="/login" />,
    },
    {
      path: routes.CALENDAR,
      element: user ? <Calendar /> : <Navigate to="/login" />,
    },
    {
      path: routes.HOME,
      element: (
        <h1>This is the home page, shows product demo, and some about-us</h1>
      ),
    },
  ]);

  return element;
};

export default Router;

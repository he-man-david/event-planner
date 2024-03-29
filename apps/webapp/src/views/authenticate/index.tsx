import { useEffect, useCallback } from 'react';
import { useStytch, useStytchUser } from '@stytch/react';
import { useNavigate } from 'react-router-dom';
import { routes } from 'const/routes';
import LoadingPage from 'components/loadingPage';
import useUsersApi from 'apis/users';
import { User } from '@stytch/vanilla-js';

/*
During both the Magic link and OAuth flow, Stytch will redirect the user back to your application to a specified redirect URL (see Login.js). 
Stytch will append query parameters to the redirect URL which are then used to complete the authentication flow. 
A redirect URL for this example app will look something like: http://localhost:4200/?stytch_token_type=magic_links&token=abc123
Authenticate will detect the presence of a token in the query parameters, and attempt to authenticate it.
On successful authentication, a session will be created
*/

const Authenticate = () => {
  const stytch = useStytch();
  const { user } = useStytchUser();
  const navigate = useNavigate();
  const usersApi = useUsersApi();

  const updateUser = useCallback(
    async (authenticatedUser: User) => {
      // Is it possible if user have no email and name? probably not?
      const email = authenticatedUser.emails.length
        ? authenticatedUser.emails[0].email
        : '';
      const name = authenticatedUser?.name?.first_name
        ? `${authenticatedUser.name.first_name} ${authenticatedUser.name.middle_name} ${authenticatedUser.name.last_name}`
        : '';
      return await usersApi.Update({
        id: authenticatedUser.user_id,
        email,
        name,
        imageUrl: null,
      });
    },
    [usersApi]
  );

  const successRedirect = useCallback(
    async (nextRoute: string | null) => {
      // TODO: call backend /authenticate API nodejs Stych sdk, then redir to next_route
      console.log('redirecting to next_route: ', nextRoute);
      if (nextRoute) {
        // TODO: make sure nextRoute is valid, so we dont get injected attacked
        navigate(nextRoute);
      } else if (nextRoute === null) navigate(routes.MY_EVENTS);
      console.error('Route is illegal! Unable to redirect!');
    },
    [navigate]
  );

  useEffect(() => {
    // If the stytch SDK is available, and there is no existing user check for a token value in query params
    if (stytch && !user) {
      const queryParams = new URLSearchParams(window.location.search);
      const token = queryParams.get('token');
      const tokenType = queryParams.get('stytch_token_type');
      const nextRoute = queryParams.get('next_route');

      // If a token is found, authenticate it with the appropriate method
      if (token && tokenType) {
        if (tokenType === 'magic_links') {
          stytch.magicLinks
            .authenticate(token, {
              session_duration_minutes: 60,
            })
            .then((authInfo) => {
              console.log('Successfully authenticated via magic link');
              successRedirect(nextRoute);
              updateUser(authInfo.user);
            });
        } else if (tokenType === 'oauth') {
          stytch.oauth
            .authenticate(token, {
              session_duration_minutes: 60,
            })
            .then((authInfo) => {
              console.log('Successfully authenticated via OAuth');
              successRedirect(nextRoute);
              updateUser(authInfo.user);
            });
        }
      }
    }
  }, [stytch, user, successRedirect, updateUser]);

  return <LoadingPage />;
};

export default Authenticate;

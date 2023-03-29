import { useEffect, useCallback } from "react";
import { useStytch, useStytchUser } from "@stytch/react";
import { useNavigate } from "react-router-dom";
import { routesArray } from "const/routes";
import LoadingIcon from "components/loadingIcon";

/*
During both the Magic link and OAuth flow, Stytch will redirect the user back to your application to a specified redirect URL (see Login.js). 
Stytch will append query parameters to the redirect URL which are then used to complete the authentication flow. 
A redirect URL for this example app will look something like: http://localhost:3000/?stytch_token_type=magic_links&token=abc123
Authenticate will detect the presence of a token in the query parameters, and attempt to authenticate it.
On successful authentication, a session will be created and the user will be shown Profile.js 
*/

const Authenticate = () => {
  const stytch = useStytch();
  const { user } = useStytchUser();
  const navigate = useNavigate();

  const successRedirect = useCallback(
    (nextRoute: string | null) => {
      console.log("redirecting to next_route: ", nextRoute);
      if (nextRoute && routesArray.includes(nextRoute)) {
        navigate(nextRoute);
      } else if (nextRoute === null) navigate(0);
      console.error("Route is illegal! Unable to redirect!");
    },
    [navigate]
  );

  useEffect(() => {
    // If the stytch SDK is available, and there is no existing user check for a token value in query params
    if (stytch && !user) {
      const queryParams = new URLSearchParams(window.location.search);
      const token = queryParams.get("token");
      const tokenType = queryParams.get("stytch_token_type");
      const nextRoute = queryParams.get("next_route");

      // If a token is found, authenticate it with the appropriate method
      if (token && tokenType) {
        if (tokenType === "magic_links") {
          stytch.magicLinks
            .authenticate(token, {
              session_duration_minutes: 60,
            })
            .then(() => {
              console.log("Successfully authenticated via magic link");
              successRedirect(nextRoute);
            });
        } else if (tokenType === "oauth") {
          stytch.oauth
            .authenticate(token, {
              session_duration_minutes: 60,
            })
            .then(() => {
              console.log("Successfully authenticated via OAuth");
              successRedirect(nextRoute);
            });
        }
      }
    }
  }, [stytch, user, successRedirect]);

  return <LoadingIcon />;
};

export default Authenticate;

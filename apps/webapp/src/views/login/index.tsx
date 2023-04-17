import { StytchLogin } from '@stytch/react';
import { Products, OAuthProviders } from '@stytch/vanilla-js';

/*
Login configures and renders the StytchLogin component which is a prebuilt UI component for auth powered by Stytch
This component accepts style, config, and callbacks props. To learn more about possible options review the documentation at
https://stytch.com/docs/sdks/javascript-sdk#ui-configs
*/
const styles = {
  container: {
    width: '100%',
  },
  buttons: {
    primary: {
      backgroundColor: '#4A37BE',
      borderColor: '#4A37BE',
    },
  },
};
const Login = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const nextRoute = queryParams.get('next_route');

  let redirectURL = 'http://localhost:4200/authenticate';
  if (nextRoute) redirectURL += `?next_route=${nextRoute}`;

  const config = {
    products: [Products.emailMagicLinks, Products.oauth],
    emailMagicLinksOptions: {
      loginRedirectURL: redirectURL,
      loginExpirationMinutes: 60,
      signupRedirectURL: redirectURL,
      signupExpirationMinutes: 60,
    },
    oauthOptions: {
      providers: [
        { type: OAuthProviders.Google },
        { type: OAuthProviders.Microsoft },
      ],
      loginRedirectURL: redirectURL,
      signupRedirectURL: redirectURL,
    },
  };

  return (
    <div className="sm:mt-8 lg:mt-28 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <StytchLogin config={config} styles={styles}/>
      </div>
    </div>
  );
};

export default Login;

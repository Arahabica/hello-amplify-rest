import React, {useEffect} from 'react';
import './App.css';
import Amplify from "aws-amplify";
import API from '@aws-amplify/api';
import {AmplifyAuthenticator, AmplifySignOut} from '@aws-amplify/ui-react';
import {AuthState, onAuthUIStateChange} from '@aws-amplify/ui-components';
import awsmobile from './aws-exports';
//import Todos from './Todos';

Amplify.configure(awsmobile);

const App = () => {
  const [authState, setAuthState] = React.useState<AuthState>();

  useEffect( () => {
    return onAuthUIStateChange(async (nextAuthState, authData) => {
      setAuthState(nextAuthState);
      console.log(nextAuthState, authData)

      const option = {
        headers: {
          // Authorization: `Bearer ${currentSession.getIdToken().getJwtToken()}`,
          // Authorization: cognitoUser.signInUserSession.idToken.jwtToken,
        },
        response: true,
        body: {
          event_id : "1"
        }
      };
      console.log('oooo');
      await API.get("api", "/items", option)
    });
  }, []);

  return authState === AuthState.SignedIn ? (
    <div className="App">
      <div>hello</div>
      <AmplifySignOut/>
    </div>
  ) : (
    <AmplifyAuthenticator/>
  );
}

export default App;

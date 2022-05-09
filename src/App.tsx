import { Dashboard } from '@evoqua/react';
import SonarQubeApi from '@evoqua/sonarqube-api';
import React from 'react';

/*
 * You must create custom environment variables beginning with REACT_APP_.
 * Any other variables except NODE_ENV will be ignored.
 * https://create-react-app.dev/docs/adding-custom-environment-variables/
 * 
 * TODO: store the user credentials somewhere else. Secrets should not be stored
 * as environment variables in a React app, since these are embedded into the
 * build, meaning anyone can view them by inspecting the app's files. Maybe
 * proxy the requests and store the credentials in the proxy server?
 */
const {
  REACT_APP_SONAR_URL,
  REACT_APP_SONAR_USERNAME,
  REACT_APP_SONAR_PASSWORD,
} = process.env;

if (
  REACT_APP_SONAR_URL === undefined
  || REACT_APP_SONAR_USERNAME === undefined
  || REACT_APP_SONAR_PASSWORD === undefined
) {
  throw new Error(
    'REACT_APP_SONAR_URL, REACT_APP_SONAR_USERNAME, REACT_APP_SONAR_PASSWORD must be set as environment variables, or in a .env file'
  );
}

export default function App() {
  const api = new SonarQubeApi(REACT_APP_SONAR_URL!);
  const [loggedIn, setLoggedIn] = React.useState(false);
  React.useEffect(() => {
    api.login(REACT_APP_SONAR_USERNAME!, REACT_APP_SONAR_PASSWORD!)
       .then(() => setLoggedIn(true));
  });
  return loggedIn
    ? <Dashboard
        projectsGetter={api}
        metricHistoryGetter={api}
        versionMetricsGetter={api}
      />
    : <div style={styles.loggingInMsg}>
        Iniciando sesión...
      </div>;
}

const styles: { [key: string]: React.CSSProperties } = {
  loggingInMsg: {
    display: 'grid',
    placeItems: 'center',
    height: '100vh',
  },
};

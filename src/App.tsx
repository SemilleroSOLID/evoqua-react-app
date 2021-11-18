require('dotenv').config();

import { Dashboard } from '@evoqua/react';
import SonarQubeApi from '@evoqua/sonarqube-api';
import React from 'react';

const { SONAR_URL, SONAR_USERNAME, SONAR_PASSWORD } = process.env;

export default function App() {
  const api = new SonarQubeApi(SONAR_URL!);
  const [loggedIn, setLoggedIn] = React.useState(false);
  React.useEffect(() => {
    api.login(SONAR_USERNAME!, SONAR_PASSWORD!)
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
}

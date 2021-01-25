import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import styled from 'styled-components/macro';

import SearchPage from 'components/SearchPage';
import Header from 'components/Header';
import ProfilePage from 'components/ProfilePage';

import { ProfilesContextProvider } from 'context/ProfilesContext';

import './styles.css';

const Page = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

function App() {
  return (
    <ProfilesContextProvider>
      <Router>
        <Page>
          <Header />
          <Switch>
            <Route exact path="/">
              <Redirect to="/search" />
            </Route>
            <Route exact path="/search">
              <SearchPage />
            </Route>
            <Route path="/profile/:id">
              <ProfilePage />
            </Route>
          </Switch>
        </Page>
      </Router>
    </ProfilesContextProvider>
  );
}

export default App;

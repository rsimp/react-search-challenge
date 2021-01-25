import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import SearchPage from 'components/SearchPage';
import Header from 'components/Header';
import ProfilePage from 'components/ProfilePage';

import { ProfilesContextProvider } from 'context/ProfilesContextProvider';

import './styles.css';

function App() {
  return (
    <ProfilesContextProvider>
      <Router>
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
      </Router>
    </ProfilesContextProvider>
  );
}

export default App;

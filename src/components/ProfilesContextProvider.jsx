import React from 'react';
import { combineReducers, createReducer } from '@reduxjs/toolkit';

import { sortProfilesAsc, sortProfilesDesc } from 'components/SearchPage/actions';
import mockProfiles from '../profiles.json';

const initialQueryState = {
  initial: true,
  loading: false,
  error: null,
};
const initialPollingState = {
  ...initialQueryState,
  secondsRemaining: 10,
};
const ProfilesReducer = combineReducers({
  profiles: createReducer([], (builder) => {
    builder.addCase(sortProfilesAsc, (profiles) =>
      profiles.sort((profileA, profileB) => (profileA.handle > profileB.handle ? 1 : -1))
    );
    builder.addCase(sortProfilesDesc, (profiles) =>
      profiles.sort((profileA, profileB) => (profileA.handle < profileB.handle ? 1 : -1))
    );
  }),
  queries: combineReducers({
    fetchProfiles: createReducer(initialQueryState, (fetchProgress) => fetchProgress),
    pollProfiles: createReducer(initialPollingState, (pollingProgress) => pollingProgress),
  }),
});

export const ProfileContext = React.createContext();

function ProfilesContextProvider({ children }) {
  const [state, dispatch] = React.useReducer(ProfilesReducer, {
    profiles: mockProfiles,
  });

  return (
    <ProfileContext.Provider value={{ ...state, dispatch }}>{children}</ProfileContext.Provider>
  );
}

export default ProfilesContextProvider;

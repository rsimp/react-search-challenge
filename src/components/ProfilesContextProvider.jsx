import React from 'react';
import { combineReducers, createReducer } from '@reduxjs/toolkit';

import {
  sortProfilesAsc,
  sortProfilesDesc,
  requestLoadProfiles,
  loadProfilesError,
  loadProfilesSuccess,
} from 'components/SearchPage/actions';

const initialQueryState = {
  initial: true,
  loading: false,
  error: null,
};
const initialPollingState = {
  ...initialQueryState,
  secondsRemaining: 10,
};

// good example of a top level reducer slice
const ProfilesReducer = combineReducers({
  authToken: createReducer('Bearer: AbCdEf123456', (token) => token),

  profiles: createReducer([], (builder) => {
    // these two cases really ought to be query parameters
    builder.addCase(sortProfilesAsc, (profiles) =>
      profiles.sort((profileA, profileB) => (profileA.handle > profileB.handle ? 1 : -1))
    );
    builder.addCase(sortProfilesDesc, (profiles) =>
      profiles.sort((profileA, profileB) => (profileA.handle < profileB.handle ? 1 : -1))
    );
    builder.addCase(loadProfilesSuccess, (_, action) => action.payload);
  }),

  queries: combineReducers({
    fetchProfiles: createReducer(initialQueryState, (builder) => {
      builder.addCase(requestLoadProfiles, (fetchProgress) => {
        fetchProgress.loading = true;
        fetchProgress.initial = false;
        fetchProgress.error = false;
        return fetchProgress;
      });
      builder.addCase(loadProfilesError, (fetchProgress, action) => {
        fetchProgress.loading = false;
        fetchProgress.error = action.payload;
        return fetchProgress;
      });
      builder.addCase(loadProfilesSuccess, (fetchProgress, action) => {
        fetchProgress.loading = false;
        return fetchProgress;
      });
    }),

    pollProfiles: createReducer(initialPollingState, (pollingProgress) => pollingProgress),
  }),
});

export const ProfileContext = React.createContext();
const initialState = ProfilesReducer(undefined, { type: '__initialize__' });

// this part might as well just use redux
function ProfilesContextProvider({ children }) {
  const [state, dispatch] = React.useReducer(ProfilesReducer, initialState);

  return (
    <ProfileContext.Provider value={{ ...state, dispatch }}>{children}</ProfileContext.Provider>
  );
}

export default ProfilesContextProvider;

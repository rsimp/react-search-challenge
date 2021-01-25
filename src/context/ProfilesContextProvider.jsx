import React from 'react';
import { combineReducers, createReducer } from '@reduxjs/toolkit';

import {
  sortProfilesAsc,
  sortProfilesDesc,
  requestLoadProfiles,
  loadProfilesError,
  loadProfilesSuccess,
} from 'components/SearchPage/actions';
import {
  setAutoFetch,
  setCountdownText,
  pollProfilesSuccess,
  pollProfilesError,
  requestPollProfiles,
} from 'components/PollWidget/actions';

const initialQueryState = {
  initial: true,
  loading: false,
  error: null,
};

const payloadReducer = (_, action) => action.payload;
const valueReducer = (value) => () => value;

// good example of a top level reducer slice
const ProfilesReducer = combineReducers({
  autoFetchProfiles: createReducer(false, (builder) => {
    builder.addCase(setAutoFetch, payloadReducer);
    builder.addCase(loadProfilesSuccess, valueReducer(true));
    builder.addCase(loadProfilesError, valueReducer(true));
  }),

  countdownText: createReducer('', (builder) => {
    builder.addCase(setCountdownText, payloadReducer);
    builder.addCase(setAutoFetch, (_, action) => (action.payload ? '10' : ''));
  }),

  profiles: createReducer([], (builder) => {
    // these two cases really ought to be query parameters
    builder.addCase(sortProfilesAsc, (profiles) =>
      profiles.sort((profileA, profileB) => (profileA.handle > profileB.handle ? 1 : -1))
    );
    builder.addCase(sortProfilesDesc, (profiles) =>
      profiles.sort((profileA, profileB) => (profileA.handle < profileB.handle ? 1 : -1))
    );
    builder.addCase(loadProfilesSuccess, payloadReducer);
    builder.addCase(pollProfilesSuccess, payloadReducer);
  }),

  queries: combineReducers({
    loadProfiles: createReducer(initialQueryState, (builder) => {
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

    pollProfiles: createReducer({ loading: false, error: null }, (builder) => {
      builder.addCase(requestPollProfiles, (fetchProgress) => {
        fetchProgress.loading = true;
        fetchProgress.error = null;
        return fetchProgress;
      });
      builder.addCase(pollProfilesError, (fetchProgress, action) => {
        fetchProgress.loading = false;
        fetchProgress.error = action.payload;
        return fetchProgress;
      });
      builder.addCase(pollProfilesSuccess, (fetchProgress, action) => {
        fetchProgress.loading = false;
        fetchProgress.error = null;
        return fetchProgress;
      });
    }),
  }),
});

export const ProfilesContext = React.createContext();
const initialState = ProfilesReducer(undefined, { type: '__initialize__' });

// this part might as well just use redux
export function ProfilesContextProvider({ children }) {
  const [state, dispatch] = React.useReducer(ProfilesReducer, initialState);

  return (
    <ProfilesContext.Provider
      value={{ ...state, dispatch, authToken: 'Bearer: AbCdEf123456', pollInterval: 10 }}
    >
      {children}
    </ProfilesContext.Provider>
  );
}

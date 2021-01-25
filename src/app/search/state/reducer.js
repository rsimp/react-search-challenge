import { combineReducers, createReducer } from '@reduxjs/toolkit';

import { defaultAsyncState } from 'core/structures';
import { payloadReducer, valueReducer } from 'core/reducer-helpers';

import {
  sortProfilesAsc,
  sortProfilesDesc,
  requestLoadProfiles,
  loadProfilesError,
  loadProfilesSuccess,
} from './actions';

const defaultPollingState = {
  ...defaultAsyncState,
  pollInterval: 10,
};

export default combineReducers({
  profiles: createReducer([], (builder) => {
    // these two cases really ought to be query parameters
    builder.addCase(sortProfilesAsc, (profiles) =>
      profiles.sort((profileA, profileB) => (profileA.handle > profileB.handle ? 1 : -1))
    );
    builder.addCase(sortProfilesDesc, (profiles) =>
      profiles.sort((profileA, profileB) => (profileA.handle < profileB.handle ? 1 : -1))
    );
    builder.addCase(loadProfilesSuccess, payloadReducer);
  }),

  queries: combineReducers({
    loadProfiles: createReducer(defaultAsyncState, (builder) => {
      builder.addCase(
        requestLoadProfiles,
        valueReducer({
          loading: true,
          initial: false,
          error: false,
        })
      );
      builder.addCase(loadProfilesError, (fetchProgress, action) => {
        // reduxjs/tookit uses immer so not actually mutating
        fetchProgress.loading = false;
        fetchProgress.error = action.payload;
        return fetchProgress;
      });
      builder.addCase(loadProfilesSuccess, (fetchProgress, action) => {
        // reduxjs/tookit uses immer so not actually mutating
        fetchProgress.loading = false;
        return fetchProgress;
      });
    }),

    pollProfiles: createReducer(defaultPollingState, (pollingProgress) => pollingProgress),
  }),
});

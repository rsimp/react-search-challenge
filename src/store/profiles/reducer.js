import { combineReducers, createReducer } from '@reduxjs/toolkit';
import {
  sortProfilesAsc,
  sortProfilesDesc,
  requestLoadProfiles,
  loadProfilesError,
  loadProfilesSuccess,
} from 'components/SearchPage/actions';
import {
  autoFetchChanged,
  setCountdownText,
  pollProfilesSuccess,
  pollProfilesError,
  requestPollProfiles,
} from 'components/PollWidget/actions';

import { valueReducer, payloadReducer } from '../reducer-helpers';

const initialQueryState = {
  initial: true,
  loading: false,
  error: null,
};

// good example of a top level reducer slice
export default combineReducers({
  autoFetch: combineReducers({
    isEnabled: createReducer(false, (builder) => {
      builder.addCase(autoFetchChanged, payloadReducer);
      builder.addCase(loadProfilesSuccess, valueReducer(true));
      builder.addCase(loadProfilesError, valueReducer(true));
    }),
    countdownText: createReducer('', (builder) => {
      builder.addCase(setCountdownText, payloadReducer);
      builder.addCase(autoFetchChanged, valueReducer(''));
    }),
    pollInterval: valueReducer(10 * 1000),
  }),

  items: createReducer([], (builder) => {
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
      builder.addCase(loadProfilesSuccess, (fetchProgress) => {
        fetchProgress.loading = false;
        fetchProgress.error = null;
        return fetchProgress;
      });

      //need to wipe out any old errors
      builder.addCase(pollProfilesSuccess, (fetchProgress) => {
        fetchProgress.loading = false;
        fetchProgress.error = null;
        return fetchProgress;
      });
    }),

    // these may not be necessary, keeping in case useful later
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
      builder.addCase(pollProfilesSuccess, (fetchProgress) => {
        fetchProgress.loading = false;
        fetchProgress.error = null;
        return fetchProgress;
      });
    }),
  }),
});

import {
  requestPollProfiles,
  pollProfilesError,
  pollProfilesSuccess,
  setCountdownText,
} from './actions';
import { getPollInterval } from 'store/profiles/selectors';
import { getAuthToken } from 'store/login/selectors';

export const pollProfilesThunk = (abortController, targetTime) => async (dispatch, getState) => {
  const eventQueuePadding = 25; // wont be executed right on time so lets give some padding
  const secondsLeft = Math.floor((targetTime - Date.now() + eventQueuePadding) / 1000);
  if (!abortController.signal.aborted) {
    dispatch(setCountdownText(`${secondsLeft}`));
    if (secondsLeft <= 0) {
      dispatch(requestPollProfiles());
      try {
        const profileBody = await fetch('/api/profiles', {
          method: 'get',
          headers: new Headers({
            Authorization: getAuthToken(getState()),
            'Content-Type': 'application/json',
          }),
          signal: abortController.signal,
        });
        const profiles = await profileBody.json();
        dispatch(pollProfilesSuccess(profiles));
      } catch (e) {
        console.error(e);
        dispatch(pollProfilesError(e));
      }
      dispatch(pollProfilesThunk(abortController, Date.now() + getPollInterval(getState())));
    } else {
      const secondDelta = (secondsLeft - 1) * 1000;
      const timeoutTarget = targetTime - secondDelta - eventQueuePadding;
      const timeoutAmount = timeoutTarget - Date.now();
      setTimeout(() => dispatch(pollProfilesThunk(abortController, targetTime)), timeoutAmount);
    }
  }
};

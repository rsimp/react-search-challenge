import {
  requestPollProfiles,
  pollProfilesError,
  pollProfilesSuccess,
  setCountdownText,
} from './actions';
import { getAuthToken, getPollInterval } from 'context/selectors';

export const pollProfiles = async (context, abortController, secondsLeft) => {
  if (!abortController.signal.aborted) {
    context.dispatch(setCountdownText(`${secondsLeft}`));
    if (secondsLeft === 0) {
      context.dispatch(requestPollProfiles());
      try {
        const profileBody = await fetch('/api/profiles', {
          method: 'get',
          headers: new Headers({
            Authorization: getAuthToken(context),
            'Content-Type': 'application/json',
          }),
          signal: abortController.signal,
        });
        const profiles = await profileBody.json();
        context.dispatch(pollProfilesSuccess(profiles));
      } catch (e) {
        console.error(e);
        context.dispatch(pollProfilesError(e));
      }
      pollProfiles(context, abortController, getPollInterval(context));
    } else {
      setTimeout(() => pollProfiles(context, abortController, secondsLeft - 1), 1000);
    }
  }
};

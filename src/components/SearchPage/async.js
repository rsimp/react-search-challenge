import { getAuthToken } from 'store/login/selectors';

import { requestLoadProfiles, loadProfilesSuccess, loadProfilesError } from './actions';

export const loadProfilesThunk = () => async (dispatch, getState) => {
  dispatch(requestLoadProfiles());
  try {
    const profileBody = await fetch('/api/profiles', {
      method: 'get',
      headers: new Headers({
        Authorization: getAuthToken(getState()),
        'Content-Type': 'application/json',
      }),
    });
    const profiles = await profileBody.json();
    dispatch(loadProfilesSuccess(profiles));
  } catch (e) {
    console.error(e);
    dispatch(loadProfilesError(e));
  }
};

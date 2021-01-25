import { requestLoadProfiles, loadProfilesSuccess, loadProfilesError } from './actions';

export const loadProfiles = async (dispatch, state) => {
  dispatch(requestLoadProfiles());
  try {
    const profileBody = await fetch('/api/profiles', {
      method: 'get',
      headers: new Headers({
        Authorization: state.authToken,
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

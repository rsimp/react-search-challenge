export const getAuthToken = (state) => state.authToken;

export const getProfiles = (state) => state.profiles;

export const areProfilesLoaded = (state) => {
  const {
    queries: { loadProfiles },
    profiles,
  } = state;
  console.log(state);
  return !loadProfiles.initial && (!loadProfiles.error || profiles.length > 0);
};

export const getLoadProfilesError = (state) => {
  return state.queries.loadProfiles?.error;
};

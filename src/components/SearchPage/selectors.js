export const getProfiles = (state) => {
  return state.profiles;
};

export const areProfilesLoaded = (state) => {
  const {
    queries: { fetchProfiles },
    profiles,
  } = state;
  console.log(state);
  return !fetchProfiles.initial && (!fetchProfiles.error || profiles.length > 0);
};

export const getLoadError = (state) => {
  return state.queries.fetchProfiles?.error;
};

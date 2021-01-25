const getSearchState = (state) => state.search;

export const getProfiles = (state) => {
  return getSearchState(state).profiles;
};

export const areProfilesLoaded = (state) => {
  const {
    queries: { loadProfiles },
    profiles,
  } = getSearchState(state);
  return !loadProfiles.initial && (!loadProfiles.error || profiles.length > 0);
};

export const getLoadError = (state) => {
  return getSearchState(state).queries.fetchProfiles?.error;
};

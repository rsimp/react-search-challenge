const getProfilesSlice = (state) => state.profiles;
export const getProfiles = (state) => getProfilesSlice(state).items;

export const getAreProfilesLoaded = (state) => {
  const {
    queries: { loadProfiles },
    items,
  } = getProfilesSlice(state);
  return !loadProfiles.initial && (!loadProfiles.loading || items.length > 0);
};

export const getHasLoadProfilesResolved = (state) => {
  const {
    queries: { loadProfiles },
  } = getProfilesSlice(state);
  return !loadProfiles.initial && !loadProfiles.loading;
};
export const getLoadProfilesError = (state) => getProfilesSlice(state).queries.loadProfiles?.error;
export const getProfileById = (state, id) =>
  getProfilesSlice(state).items.find((profile) => profile.id === Number(id));

const getAutoFetchSlice = (state) => getProfilesSlice(state).autoFetch;
export const getIsAutoFetchEnabled = (state) => getAutoFetchSlice(state).isEnabled;
export const getPollInterval = (state) => getAutoFetchSlice(state).pollInterval;
export const getCountdownText = (state) => getAutoFetchSlice(state).countdownText;

export const getAuthToken = (state) => state.authToken;
export const getProfiles = (state) => state.profiles;

export const areProfilesLoaded = (state) => {
  const {
    queries: { loadProfiles },
    profiles,
  } = state;
  return !loadProfiles.initial && (!loadProfiles.error || profiles.length > 0);
};

export const hasLoadProfilesResolved = (state) => {
  const {
    queries: { loadProfiles },
  } = state;
  return !loadProfiles.initial && !loadProfiles.loading;
};

export const getLoadProfilesError = (state) => state.queries.loadProfiles?.error;
export const getAutoFetchProfiles = (state) => state.autoFetchProfiles;
export const getPollInterval = (state) => state.pollInterval;
export const getCountdownText = (state) => state.countdownText;

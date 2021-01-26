import { createAction } from '@reduxjs/toolkit';

const prefix = 'search/profiles/poll';

export const autoFetchChanged = createAction(`${prefix}/auto-fetch-changed`);
export const setCountdownText = createAction(`${prefix}/set-countdown-text`);

export const requestPollProfiles = createAction(`${prefix}/request/pending`);
export const pollProfilesSuccess = createAction(`${prefix}/response/success`);
export const pollProfilesError = createAction(`${prefix}/response/error`);

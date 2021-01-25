import { createAction } from '@reduxjs/toolkit';

const prefix = 'search/profiles/poll';

export const setAutoFetch = createAction(`${prefix}/set-auto-fetch`);
export const setCountdownText = createAction(`${prefix}/set-countdown-text`);

export const requestPollProfiles = createAction(`${prefix}/request/pending`);
export const pollProfilesSuccess = createAction(`${prefix}/response/success`);
export const pollProfilesError = createAction(`${prefix}/response/error`);

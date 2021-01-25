import { createAction } from '@reduxjs/toolkit';

const prefix = 'search/profiles';

export const sortProfilesAsc = createAction(`${prefix}/sort-ascending`);
export const sortProfilesDesc = createAction(`${prefix}/sort-descending`);

export const requestLoadProfiles = createAction(`${prefix}/load/request/pending`);
export const loadProfilesSuccess = createAction(`${prefix}/load/response/success`);
export const loadProfilesError = createAction(`${prefix}/load/response/error`);

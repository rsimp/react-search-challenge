import { createAction } from '@reduxjs/toolkit';

const prefix = 'search/profiles';

export const sortProfilesAsc = createAction(`${prefix}/sort-ascending`);
export const sortProfilesDesc = createAction(`${prefix}/sort-descending`);

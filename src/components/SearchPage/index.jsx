import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/macro';

import {
  getAreProfilesLoaded,
  getLoadProfilesError,
  getProfiles,
  getHasLoadProfilesResolved,
} from 'store/profiles/selectors';

import MinimalButton from 'components/MinimalButton';
import SearchCard from 'components/SearchCard';
import PollWidget from 'components/PollWidget';
import { ScreenMessage, ErrorMessage } from 'components/ScreenMessages';

import { sortProfilesAsc, sortProfilesDesc } from './actions';
import { loadProfilesThunk } from './async';

const Main = styled.main`
  margin: 24px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const SearchControlsRow = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const LeftSearchControls = styled.div`
  margin-right: auto;
`;

const SearchCardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
  margin-top: 16px;
  @media screen and (max-width: 500px) {
    justify-content: center;
  }
`;

export const SearchPage = React.memo(() => {
  const dispatch = useDispatch();

  const areProfilesLoaded = useSelector(getAreProfilesLoaded);
  const hasLoadProfilesResolved = useSelector(getHasLoadProfilesResolved);
  const loadProfilesError = useSelector(getLoadProfilesError);
  const profiles = useSelector(getProfiles);

  useEffect(() => {
    if (!areProfilesLoaded) {
      dispatch(loadProfilesThunk());
    }
  }, [dispatch, areProfilesLoaded]);

  function renderProfiles() {
    if (!areProfilesLoaded) {
      // TODO skeleton screens would be pretty nice here, less flicker too
      return <ScreenMessage>Loading profiles...</ScreenMessage>;
    }

    if (loadProfilesError) {
      return <ErrorMessage>An error occured loading profiles</ErrorMessage>;
    }

    if (profiles.length === 0) {
      return <ScreenMessage>No matches found</ScreenMessage>;
    }

    return (
      <SearchCardsContainer>
        {profiles.map((profile) => (
          <SearchCard
            key={profile.id}
            id={profile.id}
            photoUrl={profile.photoUrl}
            handle={profile.handle}
            location={profile.location}
            age={profile.age}
            photoCount={profile.photoCount}
          />
        ))}
      </SearchCardsContainer>
    );
  }

  const handleSortAscending = useCallback(() => {
    dispatch(sortProfilesAsc());
  }, [dispatch]);

  const handleSortDescending = useCallback(() => {
    dispatch(sortProfilesDesc());
  }, [dispatch]);

  return (
    <Main>
      <SearchControlsRow>
        <LeftSearchControls>
          <PollWidget disabled={!hasLoadProfilesResolved} />
        </LeftSearchControls>
        <MinimalButton disabled>
          <img src="filter.svg" width={22} alt="filter" />
        </MinimalButton>

        <MinimalButton disabled={profiles.length} onClick={handleSortAscending}>
          <img src="./ascending.svg" width={22} alt="Sort ascending" />
        </MinimalButton>

        <MinimalButton disabled={profiles.length} onClick={handleSortDescending}>
          <img src="./descending.svg" width={22} alt="Sort descending" />
        </MinimalButton>
      </SearchControlsRow>

      {renderProfiles(profiles)}
    </Main>
  );
});
SearchPage.displayName = 'SearchPage';
export default SearchPage;

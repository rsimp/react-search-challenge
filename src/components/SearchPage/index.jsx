import React from 'react';
import styled from 'styled-components/macro';

import { ProfilesContext } from 'context/ProfilesContext';
import {
  areProfilesLoaded,
  getLoadProfilesError,
  getProfiles,
  hasLoadProfilesResolved,
} from 'context/selectors';

import MinimalButton from 'components/MinimalButton';
import SearchCard from 'components/SearchCard';
import PollWidget from 'components/PollWidget';
import { ScreenMessage, ErrorMessage } from 'components/ScreenMessages';

import { sortProfilesAsc, sortProfilesDesc } from './actions';
import { loadProfiles } from './async';

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

class SearchPage extends React.Component {
  static contextType = ProfilesContext;

  componentDidMount() {
    if (!areProfilesLoaded(this.context)) {
      loadProfiles(this.context.dispatch, this.context);
    }
  }

  handleSortAscending = () => {
    this.context.dispatch(sortProfilesAsc());
  };

  handleSortDescending = () => {
    this.context.dispatch(sortProfilesDesc());
  };

  renderProfiles(profiles) {
    if (!areProfilesLoaded(this.context)) {
      // TODO skeleton screens would be pretty nice here, less flicker too
      return <ScreenMessage>Loading profiles...</ScreenMessage>;
    }

    const loadError = getLoadProfilesError(this.context);
    if (loadError) {
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

  render() {
    const profiles = getProfiles(this.context);

    return (
      <Main>
        <SearchControlsRow>
          <LeftSearchControls>
            <PollWidget disabled={!hasLoadProfilesResolved(this.context)} />
          </LeftSearchControls>
          <MinimalButton disabled>
            <img src="filter.svg" width={22} alt="filter" />
          </MinimalButton>

          <MinimalButton disabled={profiles.length} onClick={this.handleSortAscending}>
            <img src="./ascending.svg" width={22} alt="Sort ascending" />
          </MinimalButton>

          <MinimalButton disabled={profiles.length} onClick={this.handleSortDescending}>
            <img src="./descending.svg" width={22} alt="Sort descending" />
          </MinimalButton>
        </SearchControlsRow>

        {this.renderProfiles(profiles)}
      </Main>
    );
  }
}

export default SearchPage;

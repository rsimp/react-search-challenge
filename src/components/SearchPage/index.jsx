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

import { sortProfilesAsc, sortProfilesDesc } from './actions';
import { loadProfiles } from './async';

const Main = styled.main`
  margin: 24px;
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
    // TODO have all non card messages centered with larger font
    if (!areProfilesLoaded(this.context)) {
      return 'loading profiles...';
    }

    const loadError = getLoadProfilesError(this.context);
    if (loadError) {
      return loadError.message;
    }

    if (profiles.length === 0) {
      return 'No matches found';
    }

    return profiles.map((profile) => (
      <SearchCard
        key={profile.id}
        id={profile.id}
        photoUrl={profile.photoUrl}
        handle={profile.handle}
        location={profile.location}
        age={profile.age}
        photoCount={profile.photoCount}
      />
    ));
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

        <SearchCardsContainer>{this.renderProfiles(profiles)}</SearchCardsContainer>
      </Main>
    );
  }
}

export default SearchPage;

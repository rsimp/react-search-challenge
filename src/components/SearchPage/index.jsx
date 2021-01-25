import React from 'react';
import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';

import { ProfilesContext } from 'context/ProfilesContextProvider';
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
`;

const LeftSearchControls = styled.div`
  margin-right: auto;
`;

const SearchCardContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 16px;
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
      <Link to={`/profile/${profile.id}`} key={profile.id}>
        <SearchCard
          photoUrl={profile.photoUrl}
          handle={profile.handle}
          location={profile.location}
          age={profile.age}
          photoCount={profile.photoCount}
        />
      </Link>
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

        <SearchCardContainer>{this.renderProfiles(profiles)}</SearchCardContainer>
      </Main>
    );
  }
}

export default SearchPage;

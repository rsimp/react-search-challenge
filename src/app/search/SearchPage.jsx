import React from 'react';
import styled from 'styled-components/macro';

import { AppStateContext } from 'core/AppState';

import MinimalButton from 'app/MinimalButton';
import Header from 'app/Header';
import SearchCard from 'app/search/SearchCard';

import { sortProfilesAsc, sortProfilesDesc } from './state/actions';
import { loadProfiles } from './state/async';
import { areProfilesLoaded, getLoadError, getProfiles } from './state/selectors';

const Main = styled.main`
  margin: 24px;
`;

const SearchControlsRow = styled.main`
  display: flex;
  justify-content: flex-end;
`;

const SearchCardContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 16px;
`;

class SearchPage extends React.Component {
  static contextType = AppStateContext;

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
      // TODO Center display
      return 'loading profiles...';
    }

    const loadError = getLoadError(this.context);
    if (loadError) {
      // TODO Center display
      return loadError.message;
    }

    if (profiles.length === 0) {
      // TODO Center display
      return 'No matches found';
    }

    return profiles.map((profile) => (
      <SearchCard
        key={profile.id}
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
      <React.Fragment>
        <Header />

        <Main>
          <SearchControlsRow>
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
      </React.Fragment>
    );
  }
}

export default SearchPage;

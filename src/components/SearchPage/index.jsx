import React from 'react';

import { ProfileContext } from 'components/ProfilesContextProvider';

import MinimalButton from 'components/MinimalButton';
import Header from 'components/Header';
import SearchCard from 'components/SearchCard';

import { sortProfilesAsc, sortProfilesDesc } from './actions';

class SearchPage extends React.Component {
  static contextType = ProfileContext;

  handleSortAscending = () => {
    this.context.dispatch(sortProfilesAsc());
  };

  handleSortDescending = () => {
    this.context.dispatch(sortProfilesDesc());
  };

  render() {
    const { profiles = [] } = this.context;

    return (
      <React.Fragment>
        <Header />

        <main style={{ margin: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <MinimalButton disabled>
              <img src="filter.svg" width={22} alt="filter" />
            </MinimalButton>

            <MinimalButton onClick={this.handleSortAscending}>
              <img src="./ascending.svg" width={22} alt="Sort ascending" />
            </MinimalButton>

            <MinimalButton onClick={this.handleSortDescending}>
              <img src="./descending.svg" width={22} alt="Sort descending" />
            </MinimalButton>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr 1fr',
              gridGap: '16px',
            }}
          >
            {profiles.map((profile) => (
              <SearchCard
                key={profile.id}
                photoUrl={profile.photoUrl}
                handle={profile.handle}
                location={profile.location}
                age={profile.age}
                photoCount={profile.photoCount}
              />
            ))}
          </div>
        </main>
      </React.Fragment>
    );
  }
}

export default SearchPage;

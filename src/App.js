import React from 'react';
import SearchPage from 'components/SearchPage';
import ProfilesContextProvider from 'context/ProfilesContextProvider';
import './styles.css';

function App() {
  return (
    <ProfilesContextProvider>
      <SearchPage />
    </ProfilesContextProvider>
  );
}

export default App;

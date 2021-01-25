import React from 'react';

import AppStateContextProvider from 'core/AppState';
import { importAll } from 'core/import-helper';

import SearchPage from 'app/search/SearchPage';

import './styles.css';

// register state slices (creates webpack dependency)
importAll(require.context('./app', true, /\/register\.js$/));

function App() {
  return (
    <AppStateContextProvider>
      <SearchPage />
    </AppStateContextProvider>
  );
}

export default App;

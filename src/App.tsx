import React from 'react';

import Routes from './views/index';
import { AuthProvider } from './contexts/Auth';

function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}

export default App;

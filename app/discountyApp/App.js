import React from 'react';
import AppNavigator from './AppNavigator';
import { SettingsProvider } from './SettingsContext';

const App = () => {
  return (
    <SettingsProvider>
      <AppNavigator />
    </SettingsProvider>
  );
};

export default App;

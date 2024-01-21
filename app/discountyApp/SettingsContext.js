import React, { createContext, useState } from 'react';

export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [range, setRange] = useState(100);
  const [mode, setMode] = useState('default');
  const [language, setLanguage] = useState('English');

  return (
    <SettingsContext.Provider value={{ range, setRange, mode, setMode, language, setLanguage }}>
      {children}
    </SettingsContext.Provider>
  );
};
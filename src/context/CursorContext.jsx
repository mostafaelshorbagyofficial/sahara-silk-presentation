import React, { createContext, useContext, useState } from 'react';

const CursorContext = createContext();

export function CursorProvider({ children }) {
  const [cursorType, setCursorType] = useState('default');
  const [cursorText, setCursorText] = useState('');

  const setCursor = (type = 'default', text = '') => {
    setCursorType(type);
    setCursorText(text);
  };

  const resetCursor = () => {
    setCursorType('default');
    setCursorText('');
  };

  return (
    <CursorContext.Provider value={{ cursorType, cursorText, setCursor, resetCursor }}>
      {children}
    </CursorContext.Provider>
  );
}

export function useCursor() {
  const context = useContext(CursorContext);
  if (!context) {
    throw new Error('useCursor must be used within a CursorProvider');
  }
  return context;
}

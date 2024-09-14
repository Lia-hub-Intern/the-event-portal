import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Create a context for theme mode
export const DarkModeContext = createContext();

// Dark mode provider component
export const DarkModeProvider = ({ children }) => {
  const [mode, setMode] = useState('light'); // Default to 'light'

  // Load mode preference from localStorage when the app starts
  useEffect(() => {
    const savedMode = localStorage.getItem('mode');
    if (savedMode) {
      setMode(savedMode);
    }
  }, []);

  // Add or remove the respective class on the body element and force repaint
  useEffect(() => {
    if (mode === 'dark') {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('gray-mode');
      document.body.classList.remove('light-mode');
    } else if (mode === 'gray') {
      document.body.classList.add('gray-mode');
      document.body.classList.remove('dark-mode');
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
      document.body.classList.remove('dark-mode');
      document.body.classList.remove('gray-mode');
    }
    localStorage.setItem('mode', mode); // Save the mode
  }, [mode]);

  // Function to set mode (light, dark, or gray)
  const changeMode = (newMode) => {
    console.log("Changing mode to:", newMode); // Add this log for debugging
    setMode(newMode);
  };

  return (
    <DarkModeContext.Provider value={{ mode, changeMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

// Prop validation
DarkModeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
import React, { useState, useEffect } from 'react';

function Toggle() {
  const [theme, setTheme] = useState('light');

  // Apply the selected theme to the body
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const toggleTheme = () => {
    
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    console.log( document.body.className)
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
    >
      {theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
    </button>
  );
}

export default Toggle;

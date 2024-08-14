import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useDarkMode from 'use-dark-mode';
import React from 'react';
import Toggle from './Toggle';
function Header() {

  window.global=globalThis;
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState('');
  const darkMode = useDarkMode(false);
  useEffect(() => {
    const auth = window.localStorage.getItem("auth");
    if (auth === "false" || auth === null) {
      console.log(1);
      navigate("/login");
    }
  }, [navigate]);

  const handleItemClick = (path) => {
    navigate(path); // Navigate and highlight the active item
  };

  return (
    <header className="bg-gradient-to-r from-purple-500 to-pink-500 text-white w-full h-16 flex items-center justify-between px-10 shadow-lg">
      <ul className="flex space-x-10">
        <li
          onClick={() => handleItemClick('/')}
          className={`text-lg cursor-pointer hover:text-yellow-300 `}
        >
          Home
        </li>
        <li
          onClick={() => handleItemClick('/Favourites')
          }
          className={`text-lg cursor-pointer hover:text-yellow-300 `}
        >
          Favourites
        </li>
        <li
          onClick={() => handleItemClick('/Collections')}
          className={`text-lg cursor-pointer hover:text-yellow-300 `}
        >
          Collections
        </li>
        <li
          onClick={() => handleItemClick('/Bought')}
          className={`text-lg cursor-pointer hover:text-yellow-300 `}
        >
          Bought Books
        </li>
        <li>
        <Toggle />
        </li>
      </ul>
      <button
        className="bg-yellow-400 text-black px-6 py-2 rounded-full hover:bg-yellow-500"
        onClick={() => navigate('/Profile')}
      >
        Profile
      </button>
    </header>
  );
}

export default Header;

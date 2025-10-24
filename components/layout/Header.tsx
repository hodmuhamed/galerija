import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { SearchIcon, SunIcon, MoonIcon, ChevronDownIcon, MenuIcon, SettingsIcon, UserIcon, LogoutIcon } from '../../constants';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const { theme, toggleTheme, user, logout } = useAppContext();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    setIsProfileOpen(false);
    logout();
  }

  return (
    <header className="flex items-center justify-between h-20 px-6 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
      <div className="flex items-center">
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 -ml-2 mr-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
          aria-label="Open menu"
        >
          <MenuIcon className="w-6 h-6" />
        </button>
        <div className="relative w-full max-w-xs hidden md:block">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <SearchIcon className="w-5 h-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search projects, cities..."
            className="w-full py-2 pl-10 pr-4 text-gray-700 bg-gray-100 border border-transparent rounded-lg dark:bg-gray-800 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          aria-label="Toggle dark mode"
        >
          {theme === 'light' ? <MoonIcon className="w-6 h-6" /> : <SunIcon className="w-6 h-6" />}
        </button>

        <div className="relative" ref={profileRef}>
          <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="flex items-center space-x-3 cursor-pointer p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800" aria-haspopup="true" aria-expanded={isProfileOpen}>
            <img className="w-10 h-10 rounded-full object-cover" src={user.avatarUrl} alt={user.name} />
            <div className="hidden md:block">
              <p className="font-semibold text-sm text-left">{user.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 text-left">{user.role}</p>
            </div>
            <ChevronDownIcon className={`w-5 h-5 text-gray-400 hidden md:block transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
          </button>
          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50 border border-gray-200 dark:border-gray-700" role="menu">
              <Link to="/profile" onClick={() => setIsProfileOpen(false)} className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700" role="menuitem">
                <UserIcon className="w-4 h-4 mr-2" /> My Profile
              </Link>
              <Link to="/settings" onClick={() => setIsProfileOpen(false)} className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700" role="menuitem">
                <SettingsIcon className="w-4 h-4 mr-2" /> Settings
              </Link>
              <div className="border-t border-gray-100 dark:border-gray-700 my-1"></div>
              <button onClick={handleLogout} className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700" role="menuitem">
                <LogoutIcon className="w-4 h-4 mr-2" /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
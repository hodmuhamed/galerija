import React from 'react';
import { NavLink } from 'react-router-dom';
import { AppName, HomeIcon, GalleryIcon, UserIcon, ActivityIcon, UploadIcon, SettingsIcon, XIcon } from '../../constants';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `flex items-center px-4 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 ${
      isActive
        ? 'bg-primary-600 text-white shadow-md'
        : 'text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
    }`;

  const handleLinkClick = () => {
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Overlay for mobile */}
      <div
        className={`fixed inset-0 bg-black/50 z-30 md:hidden transition-opacity ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      ></div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full z-40 md:relative md:z-auto md:translate-x-0 flex flex-col w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-label="Main navigation"
      >
        <div className="flex items-center justify-between h-20 px-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
          <h1 className="text-2xl font-bold text-primary-600 dark:text-primary-500">{AppName}</h1>
          <button onClick={() => setIsOpen(false)} className="md:hidden p-2 -mr-2 rounded-full text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700" aria-label="Close menu">
            <XIcon className="w-6 h-6" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
          <nav className="space-y-2">
            <NavLink to="/" onClick={handleLinkClick} className={navLinkClasses}>
              <HomeIcon className="w-5 h-5 mr-3" />
              Dashboard
            </NavLink>
            <NavLink to="/my-galleries" onClick={handleLinkClick} className={navLinkClasses}>
              <UserIcon className="w-5 h-5 mr-3" />
              My Galleries
            </NavLink>
            <NavLink to="/all-galleries" onClick={handleLinkClick} className={navLinkClasses}>
              <GalleryIcon className="w-5 h-5 mr-3" />
              All Galleries
            </NavLink>
            <NavLink to="/activity" onClick={handleLinkClick} className={navLinkClasses}>
              <ActivityIcon className="w-5 h-5 mr-3" />
              Recent Activity
            </NavLink>
            <NavLink to="/upload-center" onClick={handleLinkClick} className={navLinkClasses}>
              <UploadIcon className="w-5 h-5 mr-3" />
              Upload Center
            </NavLink>
          </nav>
        </div>
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <NavLink to="/settings" onClick={handleLinkClick} className={navLinkClasses}>
            <SettingsIcon className="w-5 h-5 mr-3" />
            Settings
          </NavLink>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
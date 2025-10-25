import React from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { SettingsIcon } from '../constants';

const Profile: React.FC = () => {
  const { user } = useAppContext();
  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">My Profile</h2>
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md max-w-2xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center sm:space-x-6">
          <img className="w-24 h-24 rounded-full object-cover ring-4 ring-primary-500/50" src={user.avatarUrl} alt={user.name} />
          <div className="text-center sm:text-left mt-4 sm:mt-0">
            <h3 className="text-2xl font-bold">{user.name}</h3>
            <p className="text-primary-500 font-medium">{user.role}</p>
            <p className="text-gray-500 dark:text-gray-400">{user.email}</p>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6">
            <p className="text-gray-600 dark:text-gray-300 text-center sm:text-left">This is a summary of your profile. To edit your details, please visit the settings page.</p>
             <div className="mt-4 flex justify-center sm:justify-start">
                <Link to="/settings" className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                    <SettingsIcon className="w-5 h-5 mr-2" />
                    Go to Settings
                </Link>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
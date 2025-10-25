import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { SaveIcon, TrashIcon, UserIcon, SunIcon, MoonIcon } from '../constants';

type Tab = 'profile' | 'appearance' | 'users' | 'system';

const Settings: React.FC = () => {
  const { user, users, updateUser, toggleTheme, theme } = useAppContext();
  const [activeTab, setActiveTab] = useState<Tab>('profile');
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
  });
  const [compressionQuality, setCompressionQuality] = useState(75);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser(formData);
  };
  
  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <form onSubmit={handleProfileSubmit} className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">Public Profile</h3>
              <p className="text-gray-500 dark:text-gray-400 mt-1">This information will be displayed publicly.</p>
            </div>
            <div className="flex items-center space-x-4">
              <img src={user.avatarUrl} alt="Avatar" className="w-16 h-16 rounded-full" />
              <button type="button" className="px-4 py-2 text-sm font-medium bg-gray-200 dark:bg-gray-700 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600">Change Avatar</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                <input type="text" name="name" id="name" value={formData.name} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                <input type="email" name="email" id="email" value={formData.email} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500" />
              </div>
            </div>
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
               <button type="submit" className="px-5 py-2.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-medium">Save Changes</button>
            </div>
          </form>
        );
      case 'appearance':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">Theme</h3>
              <p className="text-gray-500 dark:text-gray-400 mt-1">Customize the look and feel of the application.</p>
            </div>
            <div className="flex items-center space-x-4">
                <p className="text-sm font-medium">Toggle Light / Dark Mode:</p>
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-full text-gray-500 dark:text-gray-400 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  aria-label="Toggle dark mode"
                >
                  {theme === 'light' ? <MoonIcon className="w-6 h-6" /> : <SunIcon className="w-6 h-6" />}
                </button>
            </div>
          </div>
        );
      case 'users':
        return user.role === 'Admin' ? (
          <div className="space-y-6">
            <div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">User Management</h3>
                <p className="text-gray-500 dark:text-gray-400 mt-1">Add, edit, or remove users from the system.</p>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                            <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                        {users.map(u => (
                            <tr key={u.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <img className="h-10 w-10 rounded-full" src={u.avatarUrl} alt="" />
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900 dark:text-white">{u.name}</div>
                                            <div className="text-sm text-gray-500">{u.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{u.role}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                    <button className="text-primary-600 hover:text-primary-900">Edit</button>
                                    <button className="text-red-600 hover:text-red-900"><TrashIcon className="w-4 h-4 inline-block" /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          </div>
        ) : null;
      case 'system':
        return user.role === 'Admin' ? (
             <div className="space-y-6">
                 <div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">System Settings</h3>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">Manage global application settings.</p>
                </div>
                <div className="space-y-4">
                    <h4 className="font-semibold">Image Compression</h4>
                    <label htmlFor="compression" className="block text-sm font-medium">Quality ({compressionQuality}%)</label>
                    <input id="compression" type="range" min="50" max="100" value={compressionQuality} onChange={(e) => setCompressionQuality(parseInt(e.target.value, 10))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />
                </div>
                 <div className="space-y-4">
                    <h4 className="font-semibold">Storage</h4>
                    <div className="w-full bg-gray-200 rounded-full h-4 dark:bg-gray-700">
                      <div className="bg-primary-600 h-4 rounded-full" style={{width: '45%'}}></div>
                    </div>
                    <p className="text-sm text-gray-500">450 GB of 1 TB used</p>
                </div>
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700 flex space-x-4">
                   <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Backup Database</button>
                   <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">Backup Uploads</button>
                </div>
             </div>
        ) : null;
      default:
        return null;
    }
  };

  const TabButton = ({ tab, label }: { tab: Tab, label: string }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`px-3 py-2 font-medium text-sm rounded-md ${activeTab === tab ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/50 dark:text-primary-300' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white'}`}
    >
      {label}
    </button>
  );

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Settings</h2>
      <p className="text-gray-500 dark:text-gray-400 mb-6">Manage your account and workspace settings.</p>
      
      <div className="flex flex-col md:flex-row gap-8">
        <nav className="flex flex-row md:flex-col md:w-1/5 space-x-2 md:space-x-0 md:space-y-1" aria-label="Settings navigation">
          <TabButton tab="profile" label="Profile" />
          <TabButton tab="appearance" label="Appearance" />
          {user.role === 'Admin' && (
            <>
              <TabButton tab="users" label="User Management" />
              <TabButton tab="system" label="System" />
            </>
          )}
        </nav>
        
        <div className="md:w-4/5 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Settings;
import React, { useState } from 'react';
import Modal from '../common/Modal';
import { useAppContext } from '../../context/AppContext';

interface AddCityModalProps {
  onClose: () => void;
}

const AddCityModal: React.FC<AddCityModalProps> = ({ onClose }) => {
  const { addCity } = useAppContext();
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && country) {
      addCity({ name, country });
      onClose();
    }
  };

  return (
    <Modal isOpen={true} onClose={onClose} title="Add New Project City">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">City Name</label>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500" placeholder="e.g., Berlin" />
        </div>
        <div>
          <label htmlFor="country" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Country</label>
          <input type="text" id="country" value={country} onChange={(e) => setCountry(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500" placeholder="e.g., Germany" />
        </div>
        <div className="flex justify-end pt-4 space-x-2">
          <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500">Cancel</button>
          <button type="submit" className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700">Create City</button>
        </div>
      </form>
    </Modal>
  );
};

export default AddCityModal;
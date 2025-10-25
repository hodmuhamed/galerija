import React, { useState } from 'react';
import Modal from '../common/Modal';
import { City, Tag } from '../../types';
import { useAppContext } from '../../context/AppContext';

interface AddGalleryModalProps {
  city: City;
  onClose: () => void;
}

const AddGalleryModal: React.FC<AddGalleryModalProps> = ({ city, onClose }) => {
  const { addGallery } = useAppContext();
  const [street, setStreet] = useState('');
  const [houseNumber, setHouseNumber] = useState('');
  const [description, setDescription] = useState('');
  const [tag, setTag] = useState<Tag>(Tag.AUFBAU);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (street && houseNumber) {
      addGallery({
        cityId: city.id,
        address: street,
        houseNumber,
        description,
        tag,
      });
      onClose();
    }
  };

  return (
    <Modal isOpen={true} onClose={onClose} title={`New Gallery in ${city.name}`}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="street" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Street</label>
          <input type="text" id="street" value={street} onChange={(e) => setStreet(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500" />
        </div>
        <div>
          <label htmlFor="houseNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300">House Number</label>
          <input type="text" id="houseNumber" value={houseNumber} onChange={(e) => setHouseNumber(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500" />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description (Optional)</label>
          <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Default Tag</label>
          <div className="mt-2 flex space-x-4">
            <button type="button" onClick={() => setTag(Tag.AUFBAU)} className={`px-4 py-2 rounded-md text-sm font-medium ${tag === Tag.AUFBAU ? 'bg-primary-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}>AUFBAU</button>
            <button type="button" onClick={() => setTag(Tag.MESSUNG)} className={`px-4 py-2 rounded-md text-sm font-medium ${tag === Tag.MESSUNG ? 'bg-primary-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}>MESSUNG</button>
          </div>
        </div>
        <div className="flex justify-end pt-4">
          <button type="button" onClick={onClose} className="px-4 py-2 mr-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500">Cancel</button>
          <button type="submit" className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700">Create Gallery</button>
        </div>
      </form>
    </Modal>
  );
};

export default AddGalleryModal;
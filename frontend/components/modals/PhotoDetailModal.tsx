import React, { useState } from 'react';
import { Photo, Tag } from '../../types';
import Modal from '../common/Modal';
import { CalendarIcon, UserIcon } from '../../constants';
import { useAppContext } from '../../context/AppContext';

interface PhotoDetailModalProps {
  photo: Photo;
  galleryId: string;
  onClose: () => void;
}

const tagClasses: Record<Tag, string> = {
  [Tag.AUFBAU]: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  [Tag.MESSUNG]: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
};

const PhotoDetailModal: React.FC<PhotoDetailModalProps> = ({ photo, galleryId, onClose }) => {
  const { updatePhoto } = useAppContext();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTag, setEditedTag] = useState(photo.tag);
  const [editedDescription, setEditedDescription] = useState(photo.description || '');

  const takenDate = new Date(photo.takenAt).toLocaleString('en-US', { dateStyle: 'long', timeStyle: 'short' });
  const uploadedDate = new Date(photo.createdAt).toLocaleString('en-US', { dateStyle: 'long', timeStyle: 'short' });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updatePhoto(galleryId, photo.id, { tag: editedTag, description: editedDescription });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedTag(photo.tag);
    setEditedDescription(photo.description || '');
    setIsEditing(false);
  };

  return (
    <Modal isOpen={true} onClose={onClose} title="Photo Details" size="2xl">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-2/3 flex items-center justify-center bg-gray-100 dark:bg-gray-900 rounded-lg">
          <img src={photo.url} alt="Full size view" className="w-full h-auto max-h-[70vh] object-contain rounded-lg" />
        </div>
        <div className="md:w-1/3 flex flex-col">
          {isEditing ? (
            <form onSubmit={handleSave} className="flex-grow flex flex-col">
                <h4 className="text-lg font-semibold text-gray-800 dark:text-white">Edit Metadata</h4>
                <div className="space-y-4 mt-4 flex-grow">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Tag</label>
                        <div className="mt-2 flex space-x-2">
                            <button type="button" onClick={() => setEditedTag(Tag.AUFBAU)} className={`px-3 py-1.5 rounded-md text-sm font-medium ${editedTag === Tag.AUFBAU ? 'bg-primary-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}>AUFBAU</button>
                            <button type="button" onClick={() => setEditedTag(Tag.MESSUNG)} className={`px-3 py-1.5 rounded-md text-sm font-medium ${editedTag === Tag.MESSUNG ? 'bg-primary-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}>MESSUNG</button>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
                        <textarea id="description" value={editedDescription} onChange={(e) => setEditedDescription(e.target.value)} rows={5} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 custom-scrollbar"></textarea>
                    </div>
                </div>
                <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex justify-end space-x-2">
                        <button type="button" onClick={handleCancel} className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700">Save Changes</button>
                    </div>
                </div>
            </form>
          ) : (
            <>
              <div className="flex-grow space-y-4">
                <h4 className="text-lg font-semibold text-gray-800 dark:text-white">Metadata</h4>
                <div>
                  <span className={`px-3 py-1 text-sm font-semibold rounded-full ${tagClasses[photo.tag]}`}>{photo.tag}</span>
                </div>
                 <div>
                    <p className="text-sm font-medium text-gray-800 dark:text-white">Description</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{photo.description || 'No description provided.'}</p>
                 </div>
                <div className="flex items-start text-sm text-gray-600 dark:text-gray-300">
                  <CalendarIcon className="w-4 h-4 mr-2 mt-1 text-gray-400 flex-shrink-0" />
                  <div>
                    <p><strong>Taken:</strong> {takenDate}</p>
                    <p><strong>Uploaded:</strong> {uploadedDate}</p>
                  </div>
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                  <UserIcon className="w-4 h-4 mr-2 text-gray-400" />
                  <p><strong>By:</strong> {photo.uploadedBy}</p>
                </div>
              </div>
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700 mt-4">
                <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Actions</h4>
                <div className="flex flex-col space-y-2">
                    <button onClick={() => setIsEditing(true)} className="w-full text-left px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600">Edit Metadata</button>
                    <button className="w-full text-left px-4 py-2 text-red-600 bg-red-100 dark:bg-red-900/50 dark:text-red-400 rounded-md hover:bg-red-200 dark:hover:bg-red-900">Delete Photo</button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default PhotoDetailModal;
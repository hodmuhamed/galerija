import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import Breadcrumbs from './common/Breadcrumbs';
import PhotoThumbnail from './cards/PhotoThumbnail';
import { Photo, Tag } from '../types';
import PhotoDetailModal from './modals/PhotoDetailModal';
import FAB from './common/FAB';
import UploadModal from './modals/UploadModal';
import { PlusIcon } from '../constants';

const GalleryView: React.FC = () => {
  const { galleryId } = useParams<{ galleryId: string }>();
  const { getGalleryById, getCityById } = useAppContext();
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [isUploadModalOpen, setUploadModalOpen] = useState(false);

  if (!galleryId) return <div className="text-center p-8">Gallery not found.</div>;
  
  const gallery = getGalleryById(galleryId);
  if (!gallery) return <div className="text-center p-8">Gallery not found or you don't have permission to view it.</div>;

  const city = getCityById(gallery.cityId);

  return (
    <div>
      <Breadcrumbs items={[
        { label: 'Dashboard', href: '#/' },
        { label: city?.name || 'City', href: `#/city/${city?.id}` },
        { label: `${gallery.address} ${gallery.houseNumber}` }
      ]} />
      
      <div className="mb-6">
          <div className="flex items-center space-x-3">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white">{gallery.address}, {gallery.houseNumber}</h2>
              <span className={`text-sm font-semibold px-3 py-1 rounded-full ${gallery.tag === Tag.AUFBAU ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'}`}>{gallery.tag}</span>
          </div>
          <p className="text-gray-500 dark:text-gray-400 mt-1">{gallery.description}</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {gallery.photos.map(photo => (
          <PhotoThumbnail key={photo.id} photo={photo} onClick={() => setSelectedPhoto(photo)} />
        ))}
      </div>

      {gallery.photos.length === 0 && (
          <div className="text-center py-20 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
              <p className="text-gray-500 dark:text-gray-400">This gallery is empty.</p>
              <button onClick={() => setUploadModalOpen(true)} className="mt-4 inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
                  <PlusIcon className="w-5 h-5 mr-2" />
                  Upload Photos
              </button>
          </div>
      )}

      {selectedPhoto && <PhotoDetailModal photo={selectedPhoto} galleryId={galleryId} onClose={() => setSelectedPhoto(null)} />}
      <FAB onClick={() => setUploadModalOpen(true)} />
      {isUploadModalOpen && <UploadModal galleryId={gallery.id} onClose={() => setUploadModalOpen(false)} />}
    </div>
  );
};

export default GalleryView;
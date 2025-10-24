import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import GalleryCard from './cards/GalleryCard';
import Breadcrumbs from './common/Breadcrumbs';
import FAB from './common/FAB';
import AddGalleryModal from './modals/AddGalleryModal';

const CityView: React.FC = () => {
  const { cityId } = useParams<{ cityId: string }>();
  const { getCityById, getGalleriesByCity } = useAppContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  if (!cityId) {
    return <div className="text-center p-8">Error: City ID is missing.</div>;
  }
  
  const city = getCityById(cityId);
  
  if (!city) {
    return <div className="text-center p-8">City not found or you don't have permission to view it.</div>;
  }

  const galleries = getGalleriesByCity(city.id);

  return (
    <div>
      <Breadcrumbs items={[{ label: 'Dashboard', href: '#/' }, { label: city.name }]} />
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">{city.name} Galleries</h2>
      
      {galleries.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleries.map(gallery => (
            <GalleryCard key={gallery.id} gallery={gallery} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
          <p className="text-gray-500 dark:text-gray-400">No galleries found for {city.name}.</p>
          <button onClick={() => setIsModalOpen(true)} className="mt-4 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">Add First Gallery</button>
        </div>
      )}

      <FAB onClick={() => setIsModalOpen(true)} />
      {isModalOpen && <AddGalleryModal city={city} onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default CityView;
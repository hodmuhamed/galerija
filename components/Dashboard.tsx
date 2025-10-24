import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import CityCard from './cards/CityCard';
import FAB from './common/FAB';
import AddCityModal from './modals/AddCityModal';

const Dashboard: React.FC = () => {
  const { cities, galleries } = useAppContext();
  const [isAddCityModalOpen, setIsAddCityModalOpen] = useState(false);

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Project Locations</h2>
      {cities.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {cities.map(city => {
            const cityGalleries = galleries.filter(g => g.cityId === city.id);
            const photoCount = cityGalleries.reduce((acc, g) => acc + g.photos.length, 0);
            const firstPhotoUrl = cityGalleries.find(g => g.photos.length > 0)?.photos[0]?.url;

            return (
              <CityCard
                key={city.id}
                cityId={city.id}
                cityName={city.name}
                galleryCount={cityGalleries.length}
                photoCount={photoCount}
                imageUrl={firstPhotoUrl || `https://picsum.photos/seed/${city.name}/400/300`}
              />
            );
          })}
        </div>
      ) : (
        <div className="text-center py-20 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
          <p className="text-gray-500 dark:text-gray-400">You haven't added any cities yet.</p>
          <button onClick={() => setIsAddCityModalOpen(true)} className="mt-4 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">Add Your First City</button>
        </div>
      )}
      <FAB onClick={() => setIsAddCityModalOpen(true)} label="Add New City" />
      {isAddCityModalOpen && <AddCityModal onClose={() => setIsAddCityModalOpen(false)} />}
    </div>
  );
};

export default Dashboard;
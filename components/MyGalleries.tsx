import React from 'react';
import { useAppContext } from '../context/AppContext';
import GalleryCard from './cards/GalleryCard';

const MyGalleries: React.FC = () => {
  const { galleries, user } = useAppContext();
  // This correctly filters galleries based on the logged-in user's ID
  const myGalleries = galleries.filter(g => g.userId === user.id);

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">My Galleries</h2>
      {myGalleries.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myGalleries.map(gallery => (
            <GalleryCard key={gallery.id} gallery={gallery} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
          <p className="text-gray-500 dark:text-gray-400">You haven't created any galleries yet.</p>
        </div>
      )}
    </div>
  );
};

export default MyGalleries;
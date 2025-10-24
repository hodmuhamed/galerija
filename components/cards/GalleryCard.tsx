import React from 'react';
import { Link } from 'react-router-dom';
import { Gallery, Tag } from '../../types';
import { CalendarIcon, ImagePlusIcon } from '../../constants';

interface GalleryCardProps {
  gallery: Gallery;
}

const tagColors: Record<Tag, string> = {
  [Tag.AUFBAU]: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  [Tag.MESSUNG]: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
};

const GalleryCard: React.FC<GalleryCardProps> = ({ gallery }) => {
  const formattedDate = new Date(gallery.updatedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const previewImage = gallery.photos.length > 0 ? gallery.photos[0].url : `https://picsum.photos/seed/${gallery.id}/400/200`;

  return (
    <Link to={`/gallery/${gallery.id}`} className="block bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="h-40 overflow-hidden">
        <img src={previewImage} alt={gallery.address} className="w-full h-full object-cover" loading="lazy"/>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">{gallery.address}, {gallery.houseNumber}</h3>
            <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${tagColors[gallery.tag]}`}>
                {gallery.tag}
            </span>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2 h-10">{gallery.description || "No description available."}</p>
        <div className="mt-4 flex flex-col space-y-2 text-sm text-gray-600 dark:text-gray-300">
            <div className="flex items-center">
                <CalendarIcon className="w-4 h-4 mr-2 text-gray-400"/>
                <span>Last updated: {formattedDate}</span>
            </div>
            <div className="flex items-center">
                <ImagePlusIcon className="w-4 h-4 mr-2 text-gray-400"/>
                <span>{gallery.photos.length} photos</span>
            </div>
        </div>
      </div>
    </Link>
  );
};

export default GalleryCard;
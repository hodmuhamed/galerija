import React from 'react';
import { Photo, Tag } from '../../types';
import { CalendarIcon } from '../../constants';

interface PhotoThumbnailProps {
  photo: Photo;
  onClick: () => void;
}

const tagClasses: Record<Tag, string> = {
  [Tag.AUFBAU]: 'bg-blue-500',
  [Tag.MESSUNG]: 'bg-green-500',
};

const PhotoThumbnail: React.FC<PhotoThumbnailProps> = ({ photo, onClick }) => {
  const takenDate = new Date(photo.takenAt).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });

  return (
    <div
      className="group relative aspect-square w-full overflow-hidden rounded-lg cursor-pointer shadow-md transition-shadow duration-300 hover:shadow-xl"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onClick()}
      aria-label={`View photo from ${takenDate}`}
    >
      <img
        src={photo.url}
        alt={`Photo from ${takenDate}`}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-2 text-white">
        <div className="flex items-center text-xs">
          <CalendarIcon className="w-3 h-3 mr-1" />
          <span>{takenDate}</span>
        </div>
      </div>
      <div className={`absolute top-2 right-2 h-2.5 w-2.5 rounded-full ${tagClasses[photo.tag]}`} title={`Tag: ${photo.tag}`}></div>
    </div>
  );
};

export default PhotoThumbnail;
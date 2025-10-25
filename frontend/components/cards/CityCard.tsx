import React from 'react';
import { Link } from 'react-router-dom';

interface CityCardProps {
  cityId: string;
  cityName: string;
  galleryCount: number;
  photoCount: number;
  imageUrl: string;
}

const CityCard: React.FC<CityCardProps> = ({ cityId, cityName, galleryCount, photoCount, imageUrl }) => {
  return (
    <Link to={`/city/${cityId}`} className="group relative block w-full h-64 overflow-hidden rounded-xl shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl">
      <img src={imageUrl} alt={cityName} className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" loading="lazy" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
      <div className="absolute bottom-0 left-0 p-4 text-white">
        <h3 className="text-2xl font-bold">{cityName}</h3>
        <p className="text-sm opacity-90">{galleryCount} Galleries &bull; {photoCount} Photos</p>
      </div>
    </Link>
  );
};

export default CityCard;
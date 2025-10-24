import { City, Gallery, Photo, Tag, User } from '../types';

export const MOCK_USER: User = {
  id: 'user-1',
  name: 'Alex Schmidt',
  email: 'alex.schmidt@photomanager.pro',
  role: 'Admin',
  avatarUrl: 'https://i.pravatar.cc/150?u=alexschmidt'
};

export const MOCK_USERS_LIST: User[] = [
  MOCK_USER,
  { id: 'user-2', name: 'Maria Garcia', email: 'maria.garcia@photomanager.pro', role: 'User', avatarUrl: 'https://i.pravatar.cc/150?u=mariagarcia' },
  { id: 'user-3', name: 'Chen Wei', email: 'chen.wei@photomanager.pro', role: 'User', avatarUrl: 'https://i.pravatar.cc/150?u=chenwei' },
  { id: 'user-4', name: 'John Smith', email: 'john.smith@photomanager.pro', role: 'Viewer', avatarUrl: 'https://i.pravatar.cc/150?u=johnsmith' },
];

const createPhotos = (galleryId: string, count: number, tag: Tag): Photo[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: `photo-${galleryId}-${i}`,
    url: `https://picsum.photos/seed/${galleryId}-${i}/800/600`,
    tag,
    createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    takenAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    uploadedBy: 'Alex Schmidt',
    description: `Sample photo ${i + 1}. This image showcases the current state of the project build.`
  }));
};


export const MOCK_CITIES: City[] = [
  { id: 'city-1', userId: 'user-1', name: 'Berlin', country: 'Germany' },
  { id: 'city-2', userId: 'user-1', name: 'Hamburg', country: 'Germany' },
  { id: 'city-3', userId: 'user-1', name: 'Munich', country: 'Germany' },
  { id: 'city-4', userId: 'user-1', name: 'Cologne', country: 'Germany' },
];

export const MOCK_GALLERIES: Gallery[] = [
  {
    id: 'gallery-1',
    userId: 'user-1',
    cityId: 'city-1',
    address: 'Brandenburger Tor',
    houseNumber: '1',
    tag: Tag.MESSUNG,
    description: 'Initial measurements for the new lighting project.',
    photos: createPhotos('gallery-1', 12, Tag.MESSUNG),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    createdBy: 'Alex Schmidt'
  },
  {
    id: 'gallery-2',
    userId: 'user-1',
    cityId: 'city-1',
    address: 'Alexanderplatz',
    houseNumber: '5',
    tag: Tag.AUFBAU,
    description: 'Construction phase of the new kiosk.',
    photos: createPhotos('gallery-2', 25, Tag.AUFBAU),
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    createdBy: 'Alex Schmidt'
  },
  {
    id: 'gallery-3',
    userId: 'user-1',
    cityId: 'city-2',
    address: 'HafenCity',
    houseNumber: '12',
    tag: Tag.AUFBAU,
    description: 'Setting up the main stage for the summer event.',
    photos: createPhotos('gallery-3', 52, Tag.AUFBAU),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    createdBy: 'Alex Schmidt'
  },
  {
    id: 'gallery-4',
    userId: 'user-1',
    cityId: 'city-3',
    address: 'Marienplatz',
    houseNumber: '8',
    tag: Tag.MESSUNG,
    description: 'Final check and measurements before handover.',
    photos: createPhotos('gallery-4', 8, Tag.MESSUNG),
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    createdBy: 'Alex Schmidt'
  },
   {
    id: 'gallery-5',
    userId: 'user-1',
    cityId: 'city-2',
    address: 'Speicherstadt',
    houseNumber: '21',
    tag: Tag.MESSUNG,
    description: 'Inspection of historical warehouse foundations.',
    photos: createPhotos('gallery-5', 18, Tag.MESSUNG),
    updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    createdBy: 'Alex Schmidt'
  },
  {
    id: 'gallery-6',
    userId: 'user-1',
    cityId: 'city-4',
    address: 'Domplatz',
    houseNumber: '4',
    tag: Tag.AUFBAU,
    description: 'Renovation work on the facade.',
    photos: createPhotos('gallery-6', 33, Tag.AUFBAU),
    updatedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    createdBy: 'Alex Schmidt'
  }
];
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { City, Gallery, Photo, Tag, User } from '../types';
import { MOCK_CITIES, MOCK_GALLERIES, MOCK_USER, MOCK_USERS_LIST } from '../data/mockData';
import { useDarkMode } from '../hooks/useDarkMode';

// Client-side image compression utility
const compressImage = (file: File): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 1920;
        const scaleSize = MAX_WIDTH / img.width;
        canvas.width = MAX_WIDTH;
        canvas.height = img.height * scaleSize;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          return reject(new Error('Could not get canvas context'));
        }
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        canvas.toBlob((blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Canvas to Blob conversion failed'));
          }
        }, 'image/jpeg', 0.75); // 75% quality
      };
    };
    reader.onerror = error => reject(error);
  });
};


interface AppContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  user: User;
  users: User[]; // Full user list for admin
  cities: City[];
  galleries: Gallery[];
  getGalleriesByCity: (cityId: string) => Gallery[];
  getGalleryById: (galleryId: string) => Gallery | undefined;
  getCityById: (cityId: string) => City | undefined;
  addGallery: (gallery: Omit<Gallery, 'id' | 'photos' | 'updatedAt' | 'createdBy' | 'userId'>) => void;
  addPhotosToGallery: (galleryId: string, photos: File[]) => Promise<void>;
  updateUser: (updatedUser: Partial<User>) => void;
  logout: () => void;
  addCity: (cityData: { name: string; country: string }) => void;
  updatePhoto: (galleryId: string, photoId: string, updates: { tag?: Tag; description?: string }) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [theme, toggleTheme] = useDarkMode();
  const [cities, setCities] = useState<City[]>(MOCK_CITIES);
  const [galleries, setGalleries] = useState<Gallery[]>(MOCK_GALLERIES);
  const [currentUser, setCurrentUser] = useState<User>(MOCK_USER);
  const [users, setUsers] = useState<User[]>(MOCK_USERS_LIST);
  
  const getGalleriesByCity = (cityId: string) => {
    return galleries.filter(gallery => gallery.cityId === cityId && gallery.userId === currentUser.id);
  };

  const getGalleryById = (galleryId: string) => {
    const gallery = galleries.find(gallery => gallery.id === galleryId);
    if (gallery?.userId === currentUser.id || currentUser.role === 'Admin') {
      return gallery;
    }
    return undefined;
  };
  
  const getCityById = (cityId: string) => {
      const city = cities.find(c => c.id === cityId);
      if (city?.userId === currentUser.id || currentUser.role === 'Admin') {
          return city;
      }
      return undefined;
  }

  const addGallery = (galleryData: Omit<Gallery, 'id' | 'photos' | 'updatedAt' | 'createdBy' | 'userId'>) => {
    const newGallery: Gallery = {
      ...galleryData,
      id: `gallery-${Date.now()}`,
      userId: currentUser.id,
      photos: [],
      updatedAt: new Date().toISOString(),
      createdBy: currentUser.name,
    };
    setGalleries(prev => [newGallery, ...prev]);
  };

  const addPhotosToGallery = async (galleryId: string, photos: File[]) => {
    const compressedPhotoBlobs = await Promise.all(photos.map(compressImage));
    
    const newPhotos: Photo[] = compressedPhotoBlobs.map((blob, index) => ({
      id: `photo-${galleryId}-${Date.now()}-${index}`,
      url: URL.createObjectURL(blob),
      tag: getGalleryById(galleryId)?.tag || Tag.AUFBAU,
      createdAt: new Date().toISOString(),
      takenAt: new Date(photos[index].lastModified).toISOString(),
      uploadedBy: currentUser.name,
      description: 'Newly uploaded photo.',
    }));

    setGalleries(prevGalleries => 
      prevGalleries.map(gallery => {
        if (gallery.id === galleryId) {
          return {
            ...gallery,
            photos: [...gallery.photos, ...newPhotos],
            updatedAt: new Date().toISOString(),
          };
        }
        return gallery;
      })
    );
  };

  const updateUser = (updatedUserData: Partial<User>) => {
    setCurrentUser(prev => ({...prev, ...updatedUserData}));
    // In a real app, you would also update the full users list
    setUsers(prevUsers => prevUsers.map(u => u.id === currentUser.id ? {...u, ...updatedUserData} : u));
    alert('Profile updated successfully! (Mock)');
  };

  const logout = () => {
    // In a real app, this would clear session/token and redirect
    alert('Logout successful! (Mock)');
  };

  const addCity = (cityData: { name: string; country: string }) => {
    const newCity: City = {
        ...cityData,
        id: `city-${Date.now()}`,
        userId: currentUser.id,
    };
    setCities(prev => [newCity, ...prev]);
  };

  const updatePhoto = (galleryId: string, photoId: string, updates: { tag?: Tag; description?: string }) => {
    setGalleries(prev => prev.map(gallery => {
        if (gallery.id === galleryId) {
            return {
                ...gallery,
                photos: gallery.photos.map(photo => {
                    if (photo.id === photoId) {
                        return { ...photo, ...updates };
                    }
                    return photo;
                })
            };
        }
        return gallery;
    }));
  };

  const value = {
    theme,
    toggleTheme,
    user: currentUser,
    users,
    cities: cities.filter(c => c.userId === currentUser.id),
    galleries,
    getGalleriesByCity,
    getGalleryById,
    getCityById,
    addGallery,
    addPhotosToGallery,
    updateUser,
    logout,
    addCity,
    updatePhoto,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
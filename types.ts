export enum Tag {
  AUFBAU = 'AUFBAU',
  MESSUNG = 'MESSUNG',
}

export interface Photo {
  id: string;
  url: string; // This will be a blob URL for client-side display
  tag: Tag;
  createdAt: string;
  takenAt: string;
  uploadedBy: string;
  description?: string;
}

export interface Gallery {
  id: string;
  userId: string;
  cityId: string;
  address: string;
  houseNumber: string;
  tag: Tag;
  description?: string;
  photos: Photo[];
  updatedAt: string;
  createdBy: string;
}

export interface City {
  id: string;
  userId: string;
  name: string;
  country: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'User' | 'Viewer';
  avatarUrl: string;
}

export interface ActivityLog {
  id: string;
  user: User;
  action: string;
  target: string;
  timestamp: string;
}
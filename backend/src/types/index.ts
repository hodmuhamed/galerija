export enum Tag {
  AUFBAU = 'AUFBAU',
  MESSUNG = 'MESSUNG',
}

export interface Photo {
  id: string;
  gallery_id: string;
  user_id: string;
  url: string;
  tag: Tag;
  created_at: string;
  taken_at: string;
  uploaded_by: string;
  description?: string;
}

export interface Gallery {
  id: string;
  user_id: string;
  city_id: string;
  address: string;
  house_number: string;
  tag: Tag;
  description?: string;
  photos: Photo[];
  updated_at: string;
  created_by: string;
}

export interface City {
  id: string;
  user_id: string;
  name: string;
  country: string;
  created_at: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'User' | 'Viewer';
  avatar_url: string;
  created_at: string;
}

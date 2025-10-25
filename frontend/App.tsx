import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Layout from './components/layout/Layout';
import Dashboard from './components/Dashboard';
import CityView from './components/CityView';
import GalleryView from './components/GalleryView';
import MyGalleries from './components/MyGalleries';
import AllGalleries from './components/AllGalleries';
import Activity from './components/Activity';
import UploadCenter from './components/UploadCenter';
import Settings from './components/Settings';
import Profile from './components/Profile';

const App: React.FC = () => {
  return (
    <AppProvider>
      <HashRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/city/:cityId" element={<CityView />} />
            <Route path="/gallery/:galleryId" element={<GalleryView />} />
            <Route path="/my-galleries" element={<MyGalleries />} />
            <Route path="/all-galleries" element={<AllGalleries />} />
            <Route path="/activity" element={<Activity />} />
            <Route path="/upload-center" element={<UploadCenter />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Layout>
      </HashRouter>
    </AppProvider>
  );
}

export default App;
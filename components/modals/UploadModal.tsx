import React, { useState, useCallback, useRef } from 'react';
import Modal from '../common/Modal';
import { CameraIcon, UploadIcon, CheckIcon } from '../../constants';
import { useAppContext } from '../../context/AppContext';

interface UploadModalProps {
  galleryId: string;
  onClose: () => void;
}

const UploadModal: React.FC<UploadModalProps> = ({ galleryId, onClose }) => {
  const { addPhotosToGallery } = useAppContext();
  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(prev => [...prev, ...Array.from(e.target.files!)]);
    }
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    // Add some visual feedback
    e.currentTarget.classList.add('border-primary-500', 'bg-primary-50', 'dark:bg-primary-900/20');
  };
  
  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.classList.remove('border-primary-500', 'bg-primary-50', 'dark:bg-primary-900/20');
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.classList.remove('border-primary-500', 'bg-primary-50', 'dark:bg-primary-900/20');
    setFiles(prev => [...prev, ...Array.from(e.dataTransfer.files)]);
  };

  const handleUpload = async () => {
    if (files.length === 0) return;
    setIsUploading(true);
    
    // The context function now handles compression and returns a promise
    await addPhotosToGallery(galleryId, files);
    
    setIsUploading(false);
    setIsComplete(true);
    setTimeout(() => {
      onClose();
    }, 1500);
  };

  return (
    <Modal isOpen={true} onClose={onClose} title="Upload Photos">
        {isComplete ? (
            <div className="flex flex-col items-center justify-center h-64">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckIcon className="w-8 h-8 text-green-600" />
                </div>
                <p className="mt-4 text-lg font-medium">Upload Complete!</p>
            </div>
        ) : isUploading ? (
            <div className="flex flex-col items-center justify-center h-64">
                <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-lg font-medium">Compressing & Uploading {files.length} photos...</p>
                <p className="text-sm text-gray-500">This may take a moment.</p>
            </div>
        ) : (
      <div className="space-y-4">
        <div onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop} className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-center transition-colors">
          <UploadIcon className="w-12 h-12 text-gray-400 mb-2"/>
          <p className="font-semibold">Drag & drop files here</p>
          <p className="text-sm text-gray-500">or</p>
          <button type="button" onClick={() => fileInputRef.current?.click()} className="mt-2 px-4 py-2 bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300 rounded-md text-sm font-medium">Browse files</button>
        </div>
        <input type="file" multiple ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
        <input type="file" ref={cameraInputRef} onChange={handleFileChange} className="hidden" accept="image/*" capture="environment" />
        
        <button type="button" onClick={() => cameraInputRef.current?.click()} className="w-full flex items-center justify-center py-3 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600">
          <CameraIcon className="w-5 h-5 mr-2" />
          Use Camera
        </button>

        {files.length > 0 && (
          <div className="space-y-2 max-h-40 overflow-y-auto custom-scrollbar pr-2">
            <h4 className="font-semibold">{files.length} files selected:</h4>
            <ul className="text-sm list-disc list-inside">
              {files.map((file, i) => <li key={i} className="truncate">{file.name}</li>)}
            </ul>
          </div>
        )}

        <div className="flex justify-end pt-4">
          <button type="button" onClick={onClose} className="px-4 py-2 mr-2 bg-gray-200 dark:bg-gray-600 rounded-md text-gray-800 dark:text-gray-200">Cancel</button>
          <button type="button" onClick={handleUpload} disabled={files.length === 0} className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 disabled:bg-gray-400 disabled:cursor-not-allowed">
            Upload {files.length > 0 ? `(${files.length})` : ''}
          </button>
        </div>
      </div>
       )}
    </Modal>
  );
};

export default UploadModal;
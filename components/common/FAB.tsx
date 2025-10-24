import React from 'react';
import { PlusIcon } from '../../constants';

interface FABProps {
  onClick: () => void;
  label?: string;
}

const FAB: React.FC<FABProps> = ({ onClick, label = "Add New Item" }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-8 right-8 bg-primary-600 text-white rounded-full p-4 shadow-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-transform duration-200 ease-in-out hover:scale-110"
      aria-label={label}
    >
      <PlusIcon className="w-7 h-7" />
    </button>
  );
};

export default FAB;
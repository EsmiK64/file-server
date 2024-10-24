import React from 'react';
import { useFileStore } from '../store/useFileStore';
import { ChevronRight, Home } from 'lucide-react';

export function Breadcrumb() {
  const { currentPath, setCurrentPath } = useFileStore();

  const handleClick = (index: number) => {
    setCurrentPath(currentPath.slice(0, index + 1));
  };

  return (
    <nav className="flex items-center space-x-2 text-sm">
      <button
        onClick={() => setCurrentPath([])}
        className="flex items-center text-gray-600 hover:text-blue-600"
      >
        <Home className="w-4 h-4" />
      </button>
      {currentPath.map((segment, index) => (
        <React.Fragment key={index}>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <button
            onClick={() => handleClick(index)}
            className="text-gray-600 hover:text-blue-600"
          >
            {segment}
          </button>
        </React.Fragment>
      ))}
    </nav>
  );
}
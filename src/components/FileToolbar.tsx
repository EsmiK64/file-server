import React from 'react';
import { useFileStore } from '../store/useFileStore';
import { Download, Upload, Trash2, FolderPlus, Search } from 'lucide-react';

export function FileToolbar() {
  const { currentUser, selectedFiles } = useFileStore();

  const canUpload = currentUser?.role !== 'user';
  const canDelete = currentUser?.role !== 'user' && selectedFiles.length > 0;

  return (
    <div className="border-t border-gray-200 px-4 py-2 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        {canUpload && (
          <>
            <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
              <Upload className="w-4 h-4 mr-2" />
              Upload
            </button>
            <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              <FolderPlus className="w-4 h-4 mr-2" />
              New Folder
            </button>
          </>
        )}
        {selectedFiles.length > 0 && (
          <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            <Download className="w-4 h-4 mr-2" />
            Download
          </button>
        )}
        {canDelete && (
          <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-red-600 bg-white hover:bg-red-50">
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </button>
        )}
      </div>
      <div className="flex items-center">
        <div className="relative">
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search files..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );
}
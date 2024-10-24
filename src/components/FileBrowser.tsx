import React from 'react';
import { useFileStore } from '../store/useFileStore';
import { FileList } from './FileList';
import { FileToolbar } from './FileToolbar';
import { Breadcrumb } from './Breadcrumb';
import { FileUpload } from './FileUpload';
import { Sidebar } from './Sidebar';

export function FileBrowser() {
  const { currentUser } = useFileStore();

  if (!currentUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Please log in to access files.</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="bg-white border-b border-gray-200">
          <div className="px-4 py-4">
            <Breadcrumb />
          </div>
          <FileToolbar />
        </div>
        <div className="flex-1 overflow-auto">
          <div className="container mx-auto px-4 py-6">
            <FileList />
          </div>
        </div>
        <FileUpload />
      </div>
    </div>
  );
}
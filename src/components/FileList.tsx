import React from 'react';
import { useFileStore } from '../store/useFileStore';
import { format } from 'date-fns';
import { File, Folder, MoreVertical } from 'lucide-react';
import { cn } from '../utils/cn';

export function FileList() {
  const { files, currentPath, currentUser, selectedFiles, selectFile, deselectFile } = useFileStore();

  const currentFiles = files.filter(file => 
    file.path === currentPath.join('/') && 
    (currentUser?.role === 'admin' || 
     (currentUser?.role === 'manager' && currentUser.managedFolders?.includes(file.ownerId)) ||
     (currentUser?.role === 'user' && file.ownerId === currentUser.id))
  );

  const handleFileClick = (fileId: string) => {
    if (selectedFiles.includes(fileId)) {
      deselectFile(fileId);
    } else {
      selectFile(fileId);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="grid grid-cols-12 px-6 py-3 bg-gray-50 border-b border-gray-200 text-sm font-medium text-gray-500">
        <div className="col-span-6">Name</div>
        <div className="col-span-2">Modified</div>
        <div className="col-span-2">Size</div>
        <div className="col-span-2">Owner</div>
      </div>
      <div className="divide-y divide-gray-200">
        {currentFiles.map((file) => (
          <div
            key={file.id}
            className={cn(
              "grid grid-cols-12 px-6 py-3 hover:bg-gray-50 cursor-pointer",
              selectedFiles.includes(file.id) && "bg-blue-50"
            )}
            onClick={() => handleFileClick(file.id)}
          >
            <div className="col-span-6 flex items-center space-x-3">
              {file.isFolder ? (
                <Folder className="w-5 h-5 text-blue-500" />
              ) : (
                <File className="w-5 h-5 text-gray-500" />
              )}
              <span className="truncate">{file.name}</span>
            </div>
            <div className="col-span-2 flex items-center text-sm text-gray-500">
              {format(file.modified, 'MMM d, yyyy')}
            </div>
            <div className="col-span-2 flex items-center text-sm text-gray-500">
              {file.isFolder ? '--' : formatFileSize(file.size)}
            </div>
            <div className="col-span-2 flex items-center justify-between">
              <span className="text-sm text-gray-500">{file.ownerId}</span>
              <button className="p-1 hover:bg-gray-100 rounded-full">
                <MoreVertical className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}
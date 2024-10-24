import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useFileStore } from '../store/useFileStore';
import { Upload } from 'lucide-react';

export function FileUpload() {
  const { currentUser, currentPath, addFile } = useFileStore();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (currentUser?.role === 'user') return;

    acceptedFiles.forEach(file => {
      const newFile = {
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        type: file.type,
        size: file.size,
        modified: new Date(),
        createdBy: currentUser?.id || '',
        path: currentPath.join('/'),
        parentId: currentPath.length > 0 ? currentPath[currentPath.length - 1] : null,
        isFolder: false,
        ownerId: currentUser?.id || ''
      };
      addFile(newFile);
    });
  }, [currentUser, currentPath, addFile]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    noClick: true,
    disabled: currentUser?.role === 'user'
  });

  if (currentUser?.role === 'user') return null;

  return (
    <div
      {...getRootProps()}
      className={`fixed inset-0 pointer-events-none ${
        isDragActive ? 'bg-blue-500 bg-opacity-10' : ''
      }`}
    >
      <input {...getInputProps()} />
      {isDragActive && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-90">
          <div className="text-center">
            <Upload className="w-16 h-16 mx-auto text-blue-500 mb-4" />
            <p className="text-xl font-medium text-gray-700">Drop files to upload</p>
          </div>
        </div>
      )}
    </div>
  );
}
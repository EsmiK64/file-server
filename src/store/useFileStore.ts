import { create } from 'zustand';
import type { FileItem, User, FileAction } from '../types/file';

interface FileStore {
  files: FileItem[];
  currentUser: User | null;
  selectedFiles: string[];
  currentPath: string[];
  fileActions: FileAction[];
  setCurrentUser: (user: User | null) => void;
  addFile: (file: FileItem) => void;
  deleteFile: (fileId: string) => void;
  selectFile: (fileId: string) => void;
  deselectFile: (fileId: string) => void;
  setCurrentPath: (path: string[]) => void;
  logAction: (action: FileAction) => void;
}

export const useFileStore = create<FileStore>((set) => ({
  files: [],
  currentUser: null,
  selectedFiles: [],
  currentPath: [],
  fileActions: [],
  
  setCurrentUser: (user) => set({ currentUser: user }),
  
  addFile: (file) => set((state) => ({
    files: [...state.files, file]
  })),
  
  deleteFile: (fileId) => set((state) => ({
    files: state.files.filter((f) => f.id !== fileId)
  })),
  
  selectFile: (fileId) => set((state) => ({
    selectedFiles: [...state.selectedFiles, fileId]
  })),
  
  deselectFile: (fileId) => set((state) => ({
    selectedFiles: state.selectedFiles.filter((id) => id !== fileId)
  })),
  
  setCurrentPath: (path) => set({ currentPath: path }),
  
  logAction: (action) => set((state) => ({
    fileActions: [...state.fileActions, action]
  }))
}));
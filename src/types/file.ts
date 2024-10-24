export type UserRole = 'user' | 'manager' | 'admin';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  managedBy?: string;
  managedFolders?: string[];
}

export interface FileItem {
  id: string;
  name: string;
  type: string;
  size: number;
  modified: Date;
  createdBy: string;
  path: string;
  parentId: string | null;
  isFolder: boolean;
  ownerId: string;
}

export interface FileAction {
  id: string;
  type: 'create' | 'modify' | 'delete' | 'access';
  userId: string;
  fileId: string;
  timestamp: Date;
  details?: string;
}
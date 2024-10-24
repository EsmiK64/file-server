import React from 'react';
import { useFileStore } from '../store/useFileStore';
import { 
  Users, Settings, Clock, Shield, 
  FolderOpen, Star, Share2 
} from 'lucide-react';

export function Sidebar() {
  const { currentUser } = useFileStore();

  const isAdmin = currentUser?.role === 'admin';
  const isManager = currentUser?.role === 'manager';

  return (
    <div className="w-64 bg-gray-800 text-white flex flex-col">
      <div className="p-4">
        <h2 className="text-xl font-semibold">File Browser</h2>
      </div>
      <nav className="flex-1 overflow-y-auto">
        <div className="px-2 space-y-1">
          <SidebarItem icon={FolderOpen} text="My Files" />
          <SidebarItem icon={Star} text="Starred" />
          <SidebarItem icon={Share2} text="Shared with me" />
          <SidebarItem icon={Clock} text="Recent" />
          
          {(isAdmin || isManager) && (
            <>
              <div className="border-t border-gray-700 my-2" />
              <SidebarItem icon={Users} text="Manage Users" />
            </>
          )}
          
          {isAdmin && (
            <>
              <SidebarItem icon={Shield} text="Access Logs" />
              <SidebarItem icon={Settings} text="Settings" />
            </>
          )}
        </div>
      </nav>
      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
            {currentUser?.name.charAt(0)}
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium">{currentUser?.name}</p>
            <p className="text-xs text-gray-400 capitalize">{currentUser?.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SidebarItem({ icon: Icon, text }: { icon: any; text: string }) {
  return (
    <button className="flex items-center w-full px-3 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md">
      <Icon className="w-5 h-5 mr-3" />
      {text}
    </button>
  );
}
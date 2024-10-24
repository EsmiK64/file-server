import React from 'react';
import { FileBrowser } from './components/FileBrowser';
import { AuthForms } from './components/auth/auth-forms';
import { useFileStore } from './store/useFileStore';

function App() {
  const { currentUser } = useFileStore();

  return (
    <div className="min-h-screen bg-gray-100">
      {currentUser ? <FileBrowser /> : <AuthForms />}
    </div>
  );
}

export default App;
import React from 'react';
import { Paintbrush, LogOut, User } from 'lucide-react';

interface HeaderProps {
  isAuthenticated: boolean;
  username: string | null;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ isAuthenticated, username, onLogout }) => {
  return (
    <header className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Paintbrush className="w-8 h-8 text-pink-500" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
            INCO Colors
          </h1>
        </div>
        
        {isAuthenticated && username && (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-gray-600">
              <User className="w-5 h-5" />
              <span className="font-medium">@{username}</span>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        )}
      </div>
      
      <p className="text-gray-600 text-lg max-w-2xl mx-auto text-center">
        Express your creativity with the INCO logo! Click on different parts and paint them with your favorite colors, then share your unique creation with Incommunity.
      </p>
    </header>
  );
};

export default Header;
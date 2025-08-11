import React, { useState, useCallback, useEffect } from 'react';
import Header from './components/Header';
import LogoCanvas from './components/LogoCanvas';
import ColorPicker from './components/ColorPicker';
import UserLogosGallery from './components/UserLogosGallery';
import LoginModal from './components/LoginModal';
import { getAuthState, signOutFromSupabase, AuthState } from './lib/auth';

function App() {
  const [selectedColor, setSelectedColor] = useState('#FE11C5');
  const [refreshGallery, setRefreshGallery] = useState(0);
  const [authState, setAuthStateLocal] = useState<AuthState>({ isAuthenticated: false, username: null });
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    // Load auth state from localStorage on app start
    const savedAuthState = getAuthState();
    setAuthStateLocal(savedAuthState);
    
    // Show login modal if not authenticated
    if (!savedAuthState.isAuthenticated) {
      setShowLoginModal(true);
    }
  }, []);

  const handleColorChange = (color: string) => {
    if (!authState.isAuthenticated) {
      setShowLoginModal(true);
      return;
    }
    setSelectedColor(color);
  };

  const handleReset = () => {
    if (!authState.isAuthenticated) {
      setShowLoginModal(true);
      return;
    }
    // This will be handled by the LogoCanvas component
    window.location.reload();
  };

  const handleLogoSaved = useCallback(() => {
    // Trigger gallery refresh
    setRefreshGallery(prev => prev + 1);
  }, []);

  const handleLogin = (authState: AuthState) => {
    setAuthStateLocal(authState);
    setShowLoginModal(false);
  };

  const handleLogout = async () => {
    await signOutFromSupabase();
    setAuthStateLocal({ isAuthenticated: false, username: null, supabaseUser: null });
    setShowLoginModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-8">
        <Header 
          isAuthenticated={authState.isAuthenticated}
          username={authState.username}
          onLogout={handleLogout}
        />
        
        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Logo Canvas */}
          <div className="flex justify-center">
            <LogoCanvas 
              selectedColor={selectedColor} 
              onLogoSaved={handleLogoSaved}
              isAuthenticated={authState.isAuthenticated}
              username={authState.username}
            />
          </div>

          {/* Color Picker */}
          <div className="flex justify-center">
            <ColorPicker
              selectedColor={selectedColor}
              onColorChange={handleColorChange}
              onReset={handleReset}
              isAuthenticated={authState.isAuthenticated}
            />
          </div>
        </div>

        {/* User Logos Gallery */}
        <div className="mt-12">
          <UserLogosGallery key={refreshGallery} />
        </div>
        
        <LoginModal
          isOpen={showLoginModal}
          onClose={() => {}} // Prevent closing without login
          onLogin={handleLogin}
        />
      </div>
    </div>
  );
}

export default App;
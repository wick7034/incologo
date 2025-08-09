import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import LogoCanvas from './components/LogoCanvas';
import ColorPicker from './components/ColorPicker';
import UserLogosGallery from './components/UserLogosGallery';

function App() {
  const [selectedColor, setSelectedColor] = useState('#FE11C5');
  const [refreshGallery, setRefreshGallery] = useState(0);

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
  };

  const handleReset = () => {
    // This will be handled by the LogoCanvas component
    window.location.reload();
  };

  const handleLogoSaved = useCallback(() => {
    // Trigger gallery refresh
    setRefreshGallery(prev => prev + 1);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-8">
        <Header />
        
        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Logo Canvas */}
          <div className="flex justify-center">
            <LogoCanvas selectedColor={selectedColor} onLogoSaved={handleLogoSaved} />
          </div>

          {/* Color Picker */}
          <div className="flex justify-center">
            <ColorPicker
              selectedColor={selectedColor}
              onColorChange={handleColorChange}
              onReset={handleReset}
            />
          </div>
        </div>

        {/* User Logos Gallery */}
        <div className="mt-12">
          <UserLogosGallery key={refreshGallery} />
        </div>
      </div>
    </div>
  );
}

export default App;
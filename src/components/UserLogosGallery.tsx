import React, { useState, useEffect } from 'react';
import { ExternalLink, Users, Palette } from 'lucide-react';
import { supabase, UserLogo } from '../lib/supabase';

const UserLogosGallery: React.FC = () => {
  const [logos, setLogos] = useState<UserLogo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchLogos();
  }, []);

  const fetchLogos = async () => {
    try {
      const { data, error } = await supabase
        .from('user_logos')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(12);

      if (error) throw error;
      setLogos(data || []);
    } catch (err) {
      setError('Failed to load user logos');
      console.error('Error fetching logos:', err);
    } finally {
      setLoading(false);
    }
  };

  const LogoPreview: React.FC<{ colors: UserLogo['logo_colors'] }> = ({ colors }) => (
    <svg 
      width="120" 
      height="40" 
      viewBox="0 0 738 248" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className="drop-shadow-sm"
    >
      <path d="M287.295 175.68V72H309.268V175.68H287.295Z" fill={colors.text}/>
      <path d="M338.834 175.68V72H361.812L419.689 141.12V72H442.237V175.68H419.258L361.094 106.272V175.68H338.834Z" fill={colors.text}/>
      <path d="M496.815 175.68C492.89 175.68 489.299 174.72 486.044 172.8C482.885 170.88 480.347 168.336 478.432 165.168C476.518 161.904 475.56 158.304 475.56 154.368V93.312C475.56 89.376 476.518 85.824 478.432 82.656C480.347 79.392 482.885 76.8 486.044 74.88C489.299 72.96 492.89 72 496.815 72H578.676V94.464H502.56C501.028 94.464 499.831 94.848 498.969 95.616C498.204 96.384 497.821 97.584 497.821 99.216V148.464C497.821 150 498.204 151.2 498.969 152.064C499.831 152.832 501.028 153.216 502.56 153.216H578.676V175.68H496.815Z" fill={colors.text}/>
      <path d="M631.852 175.68C628.022 175.68 624.48 174.72 621.224 172.8C617.969 170.88 615.384 168.288 613.469 165.024C611.554 161.76 610.597 158.208 610.597 154.368V93.312C610.597 89.376 611.554 85.824 613.469 82.656C615.384 79.392 617.969 76.8 621.224 74.88C624.48 72.96 628.022 72 631.852 72H692.745C696.575 72 700.069 72.96 703.229 74.88C706.484 76.8 709.069 79.392 710.984 82.656C712.995 85.824 714 89.376 714 93.312V154.368C714 158.208 712.995 161.76 710.984 165.024C709.069 168.288 706.484 170.88 703.229 172.8C700.069 174.72 696.575 175.68 692.745 175.68H631.852ZM632.857 153.216H691.452V94.464H632.857V153.216Z" fill={colors.text}/>
      <path d="M24 56C24 38.3269 38.2886 24 55.9145 24H191.551C209.177 24 223.466 38.3269 223.466 56V192C223.466 209.673 209.177 224 191.551 224H55.9145C38.2886 224 24 209.673 24 192V56Z" fill={colors.background}/>
      <path d="M61.8986 162L82.0047 86H103.786L83.6802 162H61.8986Z" fill={colors.line1}/>
      <path d="M103.786 162L123.893 86H145.674L125.568 162H103.786Z" fill={colors.line2}/>
      <path d="M145.674 162L165.78 86H187.562L167.456 162H145.674Z" fill={colors.line3}/>
    </svg>
  );

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-gray-600">Loading community creations...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center py-12">
            <p className="text-red-600">{error}</p>
            <button 
              onClick={fetchLogos}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="flex items-center gap-3 mb-8">
          <Users className="w-6 h-6 text-purple-600" />
          <h3 className="text-2xl font-bold text-gray-800">Community Creations</h3>
          <div className="flex items-center gap-2 ml-auto">
            <Palette className="w-5 h-5 text-gray-500" />
            <span className="text-gray-600 font-medium">{logos.length} unique designs</span>
          </div>
        </div>

        {logos.length === 0 ? (
          <div className="text-center py-12">
            <Palette className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h4 className="text-xl font-medium text-gray-600 mb-2">No creations yet</h4>
            <p className="text-gray-500">Be the first to create and share your INCO logo design!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {logos.map((logo) => (
              <div key={logo.id} className="group">
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                  <div className="flex justify-center mb-4">
                    <LogoPreview colors={logo.logo_colors} />
                  </div>
                  
                  <div className="text-center">
                    <a
                      href={`https://x.com/${logo.x_username}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition-colors"
                    >
                      @{logo.x_username}
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    <p className="text-gray-500 text-sm mt-1">
                      {new Date(logo.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 text-center">
          <button
            onClick={fetchLogos}
            className="px-6 py-3 text-blue-600 hover:text-blue-800 font-medium transition-colors border border-blue-200 rounded-lg hover:bg-blue-50"
          >
            Refresh Gallery
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserLogosGallery;
import React, { useState } from 'react';
import { X, User, AlertCircle } from 'lucide-react';

interface UsernameModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (username: string) => void;
  action: 'copy' | 'download' | 'share';
}

const UsernameModal: React.FC<UsernameModalProps> = ({ isOpen, onClose, onSubmit, action }) => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!username.trim()) {
      setError('Please enter your X username');
      return;
    }

    // Remove @ if user included it
    const cleanUsername = username.replace('@', '').trim();
    
    if (cleanUsername.length < 1) {
      setError('Please enter a valid X username');
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(cleanUsername);
      setUsername('');
      onClose();
    } catch (err) {
      setError('Failed to save. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getActionText = () => {
    switch (action) {
      case 'copy': return 'copy your logo';
      case 'download': return 'download your logo';
      case 'share': return 'share on X';
      default: return 'continue';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <User className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-800">Enter Your X Username</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <p className="text-gray-600 mb-6">
          We'll add your logo to our community gallery and link to your X profile so others can discover your creativity!
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              X Username (without @)
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="your_username"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
              disabled={isSubmitting}
            />
            {error && (
              <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                <AlertCircle className="w-4 h-4" />
                {error}
              </div>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : `Continue to ${getActionText()}`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UsernameModal;
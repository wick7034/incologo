// Simple authentication state management
export interface AuthState {
  isAuthenticated: boolean;
  username: string | null;
}

const AUTH_STORAGE_KEY = 'inco_auth_state';

export const getAuthState = (): AuthState => {
  try {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error reading auth state:', error);
  }
  
  return {
    isAuthenticated: false,
    username: null
  };
};

export const setAuthState = (state: AuthState): void => {
  try {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error('Error saving auth state:', error);
  }
};

export const clearAuthState = (): void => {
  try {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing auth state:', error);
  }
};
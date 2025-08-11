import { supabase } from './supabase';

// Simple authentication state management
export interface AuthState {
  isAuthenticated: boolean;
  username: string | null;
  supabaseUser: any | null;
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
    username: null,
    supabaseUser: null
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

export const authenticateWithSupabase = async (username: string): Promise<AuthState> => {
  try {
    // Sign in anonymously to get a Supabase session
    const { data: authData, error: authError } = await supabase.auth.signInAnonymously();
    
    if (authError) {
      throw new Error(`Authentication failed: ${authError.message}`);
    }

    // Update user metadata with X username
    const { error: updateError } = await supabase.auth.updateUser({
      data: { x_username: username }
    });

    if (updateError) {
      console.warn('Failed to update user metadata:', updateError.message);
    }

    const authState: AuthState = {
      isAuthenticated: true,
      username: username,
      supabaseUser: authData.user
    };

    setAuthState(authState);
    return authState;
  } catch (error) {
    console.error('Supabase authentication error:', error);
    throw error;
  }
};

export const signOutFromSupabase = async (): Promise<void> => {
  try {
    await supabase.auth.signOut();
    clearAuthState();
  } catch (error) {
    console.error('Sign out error:', error);
    clearAuthState(); // Clear local state even if Supabase signout fails
  }
};
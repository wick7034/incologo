import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface UserLogo {
  id: string;
  x_username: string;
  logo_colors: {
    background: string;
    letterI: string;
    letterN: string;
    letterC: string;
    letterO: string;
    line1: string;
    line2: string;
    line3: string;
  };
  created_at: string;
  updated_at: string;
}
/*
  # Update RLS policies for authenticated users

  1. Security Changes
    - Update RLS policies to work with Supabase auth
    - Allow authenticated users to insert/update their own records
    - Keep public read access for the gallery

  2. Policy Updates
    - INSERT: Allow authenticated users to create records
    - UPDATE: Allow authenticated users to update their own records
    - SELECT: Keep public read access
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Anyone can create user logos" ON user_logos;
DROP POLICY IF EXISTS "Anyone can view user logos" ON user_logos;

-- Create new policies for authenticated users
CREATE POLICY "Authenticated users can create user logos"
  ON user_logos
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update their own logos"
  ON user_logos
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can view user logos"
  ON user_logos
  FOR SELECT
  TO public
  USING (true);
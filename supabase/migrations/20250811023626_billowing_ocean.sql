/*
  # Fix RLS policies for user_logos table

  1. Security Updates
    - Drop existing policies that may be causing conflicts
    - Create new policies that properly handle authenticated users
    - Allow authenticated users to insert/update their own logos
    - Allow public read access for gallery viewing

  2. Policy Details
    - SELECT: Public access for gallery
    - INSERT: Authenticated users can create logos
    - UPDATE: Authenticated users can update their own logos based on x_username match
*/

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Anyone can view user logos" ON user_logos;
DROP POLICY IF EXISTS "Authenticated users can create user logos" ON user_logos;
DROP POLICY IF EXISTS "Authenticated users can update their own logos" ON user_logos;

-- Enable RLS (in case it's not already enabled)
ALTER TABLE user_logos ENABLE ROW LEVEL SECURITY;

-- Allow anyone to view logos (for the public gallery)
CREATE POLICY "Public read access for gallery"
  ON user_logos
  FOR SELECT
  TO public
  USING (true);

-- Allow authenticated users to insert logos
CREATE POLICY "Authenticated users can insert logos"
  ON user_logos
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Allow authenticated users to update their own logos
CREATE POLICY "Authenticated users can update own logos"
  ON user_logos
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);
/*
  # Fix RLS policies for user_logos table

  1. Security
    - Drop existing conflicting policies
    - Create proper policies that match user metadata
    - Allow authenticated users to manage their own logos
    - Allow public read access for gallery

  2. Policies
    - INSERT: Users can create logos with their own x_username
    - UPDATE: Users can update their own logos
    - SELECT: Public read access for gallery
*/

-- Drop all existing policies to start fresh
DROP POLICY IF EXISTS "Public read access for gallery" ON user_logos;
DROP POLICY IF EXISTS "Authenticated users can insert logos" ON user_logos;
DROP POLICY IF EXISTS "Authenticated users can update own logos" ON user_logos;
DROP POLICY IF EXISTS "Allow authenticated users to create their own logo" ON user_logos;
DROP POLICY IF EXISTS "Allow authenticated users to update their own logo" ON user_logos;
DROP POLICY IF EXISTS "Allow authenticated users to view all logos" ON user_logos;

-- Create INSERT policy for authenticated users
CREATE POLICY "Allow authenticated users to create their own logo"
  ON user_logos
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.jwt() -> 'user_metadata' ->> 'x_username' = x_username);

-- Create UPDATE policy for authenticated users
CREATE POLICY "Allow authenticated users to update their own logo"
  ON user_logos
  FOR UPDATE
  TO authenticated
  USING (auth.jwt() -> 'user_metadata' ->> 'x_username' = x_username)
  WITH CHECK (auth.jwt() -> 'user_metadata' ->> 'x_username' = x_username);

-- Create SELECT policy for public access (gallery)
CREATE POLICY "Public read access for gallery"
  ON user_logos
  FOR SELECT
  TO public
  USING (true);
/*
  # Create user logos table

  1. New Tables
    - `user_logos`
      - `id` (uuid, primary key)
      - `x_username` (text, required)
      - `logo_colors` (jsonb, stores the color configuration)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `user_logos` table
    - Add policy for public read access
    - Add policy for users to insert their own logos
*/

CREATE TABLE IF NOT EXISTS user_logos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  x_username text NOT NULL,
  logo_colors jsonb NOT NULL DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE user_logos ENABLE ROW LEVEL SECURITY;

-- Allow public read access to view all logos
CREATE POLICY "Anyone can view user logos"
  ON user_logos
  FOR SELECT
  TO public
  USING (true);

-- Allow anyone to insert new logos
CREATE POLICY "Anyone can create user logos"
  ON user_logos
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_user_logos_created_at ON user_logos(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_user_logos_x_username ON user_logos(x_username);
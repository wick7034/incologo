/*
  # Update user logos table for one logo per user

  1. Changes
    - Add unique constraint on x_username to ensure only one logo per user
    - Update existing duplicate entries to keep only the most recent one
    - Add updated_at trigger for automatic timestamp updates

  2. Security
    - Maintain existing RLS policies
    - Keep public read and insert access
*/

-- First, remove duplicates keeping only the most recent logo per user
DELETE FROM user_logos 
WHERE id NOT IN (
  SELECT DISTINCT ON (x_username) id
  FROM user_logos
  ORDER BY x_username, created_at DESC
);

-- Add unique constraint on x_username
ALTER TABLE user_logos ADD CONSTRAINT user_logos_x_username_unique UNIQUE (x_username);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
DROP TRIGGER IF EXISTS update_user_logos_updated_at ON user_logos;
CREATE TRIGGER update_user_logos_updated_at
    BEFORE UPDATE ON user_logos
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
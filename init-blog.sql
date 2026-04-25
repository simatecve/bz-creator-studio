CREATE TABLE IF NOT EXISTS categories (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS posts (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  content text NOT NULL,
  image_url text,
  category_id uuid REFERENCES categories(id),
  published boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone." ON categories FOR SELECT USING (true);
CREATE POLICY "Public posts are viewable by everyone." ON posts FOR SELECT USING (true);

CREATE POLICY "Auth users can insert categories" ON categories FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Auth users can update categories" ON categories FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Auth users can delete categories" ON categories FOR DELETE TO authenticated USING (true);

CREATE POLICY "Auth users can insert posts" ON posts FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Auth users can update posts" ON posts FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Auth users can delete posts" ON posts FOR DELETE TO authenticated USING (true);

-- Insert a default category
INSERT INTO categories (name, slug) VALUES ('General', 'general') ON CONFLICT DO NOTHING;

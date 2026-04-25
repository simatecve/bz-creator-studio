CREATE POLICY "Auth users can upload images" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'blog_images');
CREATE POLICY "Auth users can update images" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'blog_images');
CREATE POLICY "Auth users can delete images" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'blog_images');
CREATE POLICY "Public read images" ON storage.objects FOR SELECT USING (bucket_id = 'blog_images');

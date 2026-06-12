-- ============================================
-- STORAGE BUCKET: recipe-images
-- ============================================
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'recipe-images',
  'recipe-images',
  true,
  5242880, -- 5MB
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/avif']
)
ON CONFLICT (id) DO NOTHING;

-- Política: qualquer um pode ver imagens (bucket é público)
CREATE POLICY "recipe_images_select"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'recipe-images');

-- Política: usuário autenticado pode fazer upload
CREATE POLICY "recipe_images_insert"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'recipe-images'
    AND auth.role() = 'authenticated'
  );

-- Política: usuário só pode deletar suas próprias imagens
CREATE POLICY "recipe_images_delete"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'recipe-images'
    AND auth.uid() = owner
  );

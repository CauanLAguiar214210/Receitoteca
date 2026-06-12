-- ============================================
-- CATEGORIES
-- ============================================
CREATE TABLE categories (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  icon text
);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- Todos podem ver categorias, apenas admin cria
CREATE POLICY "categories_select_all" ON categories
  FOR SELECT USING (true);

-- ============================================
-- RECIPES
-- ============================================
CREATE TABLE recipes (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  title text NOT NULL,
  description text,
  ingredients jsonb NOT NULL,
  instructions text[] NOT NULL,
  prep_time int,
  cook_time int,
  servings int,
  difficulty text CHECK (difficulty IN ('easy', 'medium', 'hard')),
  category_id uuid REFERENCES categories(id),
  image_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE recipes ENABLE ROW LEVEL SECURITY;

-- Usuário vê suas próprias receitas
CREATE POLICY "recipes_select_own" ON recipes
  FOR SELECT USING (auth.uid() = user_id);

-- Usuário pode criar receitas (user_id = próprio)
CREATE POLICY "recipes_insert_own" ON recipes
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Usuário edita apenas suas receitas
CREATE POLICY "recipes_update_own" ON recipes
  FOR UPDATE USING (auth.uid() = user_id);

-- Usuário deleta apenas suas receitas
CREATE POLICY "recipes_delete_own" ON recipes
  FOR DELETE USING (auth.uid() = user_id);

-- ============================================
-- FAVORITES
-- ============================================
CREATE TABLE favorites (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  recipe_id uuid REFERENCES recipes(id) ON DELETE CASCADE NOT NULL,
  UNIQUE(user_id, recipe_id)
);

ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;

CREATE POLICY "favorites_select_own" ON favorites
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "favorites_insert_own" ON favorites
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "favorites_delete_own" ON favorites
  FOR DELETE USING (auth.uid() = user_id);

-- ============================================
-- AUTO-UPDATE updated_at
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER recipes_updated_at
  BEFORE UPDATE ON recipes
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- ============================================
-- SEED CATEGORIES
-- ============================================
INSERT INTO categories (name, icon) VALUES
  ('Café da Manhã', '☕'),
  ('Almoço', '🍛'),
  ('Jantar', '🍝'),
  ('Sobremesas', '🍰'),
  ('Lanches', '🥪'),
  ('Saladas', '🥗'),
  ('Massas', '🍝'),
  ('Bebidas', '🥤'),
  ('Petiscos', '🥨'),
  ('Sopas', '🍜');

-- Permissões para a service_role (usada em scripts de seed)
GRANT SELECT ON public.categories TO service_role, anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.recipes TO service_role;
GRANT SELECT, INSERT, DELETE ON public.favorites TO service_role;

-- Permissões para usuários autenticados (RLS controla o acesso)
GRANT SELECT ON public.categories TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.recipes TO authenticated;
GRANT SELECT, INSERT, DELETE ON public.favorites TO authenticated;

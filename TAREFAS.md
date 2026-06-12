# 🍽️ Site de Receitas — Plano de Tarefas

## Fase 1 — Setup do Projeto

- [ ] **1.1** Iniciar projeto com Vite + React + TypeScript
  ```bash
  npm create vite@latest . -- --template react-ts
  ```
- [ ] **1.2** Instalar dependências principais
  ```bash
  npm install react-router-dom @tanstack/react-query zustand
  npm install react-hook-form @hookform/resolvers zod
  npm install @supabase/supabase-js lucide-react react-dropzone
  ```
- [ ] **1.3** Instalar Tailwind CSS v4
  ```bash
  npm install tailwindcss @tailwindcss/vite
  ```
- [ ] **1.4** Configurar Tailwind no `vite.config.ts`
- [ ] **1.5** Configurar CSS global com `@import "tailwindcss"`
- [ ] **1.6** Criar estrutura de pastas:
  ```
  src/components/ui/
  src/components/recipe/
  src/pages/
  src/hooks/
  src/stores/
  src/lib/
  src/layouts/
  src/types/
  ```

---

## Fase 2 — Supabase (Backend)

- [ ] **2.1** Criar projeto no Supabase (supabase.com)
- [ ] **2.2** Criar tabela `categories`
  ```sql
  CREATE TABLE categories (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    name text NOT NULL,
    icon text
  );
  ```
- [ ] **2.3** Criar tabela `recipes`
  ```sql
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
    difficulty text CHECK (difficulty IN ('easy','medium','hard')),
    category_id uuid REFERENCES categories(id),
    image_url text,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
  );
  ```
- [ ] **2.4** Criar tabela `favorites`
  ```sql
  CREATE TABLE favorites (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid REFERENCES auth.users(id) NOT NULL,
    recipe_id uuid REFERENCES recipes(id) ON DELETE CASCADE NOT NULL,
    UNIQUE(user_id, recipe_id)
  );
  ```
- [ ] **2.5** Configurar Row Level Security (RLS)
  - Recipes: usuário vê/apenas edita as próprias
  - Favorites: usuário vê/apenas gerencia os seus
- [ ] **2.6** Criar bucket `recipe-images` no Supabase Storage
- [ ] **2.7** Configurar política de upload no Storage (autenticado pode upload)

---

## Fase 3 — Configuração do Cliente

- [ ] **3.1** Criar `src/lib/supabaseClient.ts` com a instância do Supabase
- [ ] **3.2** Criar `src/lib/validators.ts` com schemas Zod (recipeSchema, loginSchema, registerSchema)
- [ ] **3.3** Criar `src/types/recipe.ts` com tipos TypeScript
- [ ] **3.4** Configurar `QueryClientProvider` no App
- [ ] **3.5** Configurar `BrowserRouter` com as rotas

---

## Fase 4 — Autenticação

- [ ] **4.1** Criar hook `useAuth` (login, register, logout, session, user)
  - `src/hooks/useAuth.ts`
- [ ] **4.2** Criar `LoginPage` — formulário com email + senha
- [ ] **4.3** Criar `RegisterPage` — formulário com email + senha + confirmação
- [ ] **4.4** Criar `AuthLayout` — layout para páginas de auth
- [ ] **4.5** Proteger rotas autenticadas (redirect para /login se não logado)

---

## Fase 5 — Layout Principal

- [ ] **5.1** Criar `MainLayout` com Header + Outlet
- [ ] **5.2** Header com: logo, campo de busca, link Favoritos, menu do usuário (logout)
- [ ] **5.3** Sidebar com lista de categorias (opcional)

---

## Fase 6 — Componentes Base (ui/)

- [ ] **6.1** `Button` — variantes (primary, secondary, ghost, danger)
- [ ] **6.2** `Input` — com label, erro, placeholder
- [ ] **6.3** `Textarea` — com label, erro
- [ ] **6.4** `Select` — com label, opções, erro
- [ ] **6.5** `Modal` — overlay + conteúdo + fechar
- [ ] **6.6** `ImageUpload` — drag & drop + preview + upload pro Supabase Storage
- [ ] **6.7** `RecipeCard` — imagem, título, tempo, dificuldade, servings
- [ ] **6.8** `LoadingSpinner` — indicador de carregamento
- [ ] **6.9** `EmptyState` — mensagem quando não há receitas

---

## Fase 7 — CRUD de Receitas (Hooks)

- [ ] **7.1** `useRecipes()` — busca lista de receitas do usuário
  ```ts
  queryKey: ['recipes']
  ```
- [ ] **7.2** `useRecipe(id)` — busca receita individual
  ```ts
  queryKey: ['recipes', id]
  ```
- [ ] **7.3** `useCreateRecipe()` — mutation para criar
  ```ts
  onSuccess: invalidate ['recipes']
  ```
- [ ] **7.4** `useUpdateRecipe()` — mutation para editar
  ```ts
  onSuccess: invalidate ['recipes']
  ```
- [ ] **7.5** `useDeleteRecipe()` — mutation para deletar
  ```ts
  onSuccess: invalidate ['recipes']
  ```

---

## Fase 8 — Páginas do CRUD

- [ ] **8.1** `HomePage`
  - Hero/banner opcional
  - Grid de `RecipeCard` das últimas receitas
  - Campo de busca por título
  - Filtro por categoria e dificuldade
- [ ] **8.2** `RecipeDetailPage` (`/recipes/:id`)
  - Imagem grande no topo
  - Metadados (tempo, porções, dificuldade)
  - Lista de ingredientes
  - Passos do preparo numerados
  - Botões Editar / Excluir (apenas se owner)
  - Botão Favoritar
- [ ] **8.3** `RecipeFormPage` (`/recipes/new` e `/recipes/:id/edit`)
  - Formulário completo com React Hook Form + Zod
  - Campos: título, descrição, categoria, dificuldade, tempos, porções
  - **Ingredientes**: lista dinâmica (adicionar/remover linhas) — nome + quantidade + unidade
  - **Instruções**: lista dinâmica de passos numerados
  - ImageUpload com preview
  - Botão Salvar (cria ou edita conforme a rota)
  - Redireciona para detalhes após salvar
- [ ] **8.4** `RecipeDelete` (modal de confirmação)
  - Modal: "Tem certeza que deseja excluir?"
  - Confirma → deleta → redireciona pra lista

---

## Fase 9 — Favoritos

- [ ] **9.1** Criar hooks `useFavorites()` e `useToggleFavorite()`
- [ ] **9.2** Criar `FavoritesPage` — grid de receitas favoritadas
- [ ] **9.3** Botão favoritar (coração) no `RecipeDetailPage` e `RecipeCard`

---

## Fase 10 — Imagens (Upload)

- [ ] **10.1** Função `uploadImage(file)` — envia pro bucket Supabase e retorna URL pública
- [ ] **10.2** Integrar `ImageUpload` com o formulário de receita
- [ ] **10.3** Exibir imagem no `RecipeCard` e `RecipeDetailPage`
- [ ] **10.4** Excluir imagem do Storage ao deletar receita (opcional)

---

## Fase 11 — Busca e Filtros

- [ ] **11.1** Campo de busca na Home com debounce (300ms)
- [ ] **11.2** Filtrar receitas por nome (query ilike no Supabase)
- [ ] **11.3** Filtro por categoria (dropdown ou sidebar)
- [ ] **11.4** Filtro por dificuldade (badges clicáveis)

---

## Fase 12 — Refinamentos

- [ ] **12.1** Loading skeleton no lugar dos cards enquanto carrega
- [ ] **12.2** Toast de confirmação (receita criada/editada/excluída)
- [ ] **12.3** Responsividade (mobile-first com Tailwind)
- [ ] **12.4** Modo escuro (opcional — com Zustand + classe dark)
- [ ] **12.5** Paginação ou "load more" na listagem
- [ ] **12.6** Tratamento de erros (página 404, erro de rede)

---

## Fase 13 — Extra (Opcional)

- [ ] **13.1** Compartilhar receita por link
- [ ] **13.2** Avaliação / estrelas nas receitas
- [ ] **13.3** Lista de compras a partir dos ingredientes
- [ ] **13.4** Modo preparo (passo a passo em tela cheia)
- [ ] **13.5** PWA (manifest + service worker) para funcionar offline

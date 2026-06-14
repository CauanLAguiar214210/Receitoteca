# 🍽️ Receitas

Aplicação web para gerenciamento de receitas culinárias. Permite criar, editar, favoritar e organizar receitas com fotos, categorias e lista de compras.

## Stack

| Camada | Tecnologia |
|--------|-----------|
| Frontend | React 19 + TypeScript 6 |
| Build | Vite 8 |
| Estilo | Tailwind CSS v4 |
| Backend | Supabase (PostgreSQL + Auth + Storage) |
| Cache/Estado | TanStack React Query + Zustand |
| Formulários | React Hook Form + Zod |
| i18n | i18next (pt-BR, en-US) |
| Ícones | Lucide React |
| Deploy | AWS S3 + CloudFront |

## Funcionalidades

- Autenticação (email/senha via Supabase Auth)
- CRUD completo de receitas com formulário dinâmico
- Upload de imagens (drag & drop) para o Supabase Storage
- Busca com debounce + filtros por categoria e dificuldade
- Favoritar receitas
- Lista de compras (persistida localmente com Zustand)
- Modo preparo (passo a passo em tela cheia)
- Compartilhar receita por link
- Internacionalização pt-BR / en-US
- Responsivo (mobile-first)

## Rotas

| Rota | Página | Auth |
|------|--------|------|
| `/login` | Login | ❌ |
| `/register` | Cadastro | ❌ |
| `/` | Home (grid de receitas + busca) | ✅ |
| `/recipes/new` | Criar receita | ✅ |
| `/recipes/:id` | Detalhes da receita | ✅ |
| `/recipes/:id/edit` | Editar receita | ✅ |
| `/recipes/:id/cook` | Modo preparo | ✅ |
| `/favorites` | Favoritos | ✅ |
| `/shopping-list` | Lista de compras | ✅ |

## Scripts

```bash
npm run dev       # Servidor de desenvolvimento (Vite)
npm run build     # Type check + build de produção
npm run preview   # Preview do build local
```

## Variáveis de ambiente

```env
VITE_SUPABASE_URL=<sua-url-supabase>
VITE_SUPABASE_ANON_KEY=<sua-chave-anon>
```

## Estrutura

```
src/
├── components/
│   ├── recipe/        # RecipeCard
│   └── ui/            # Button, Input, Modal, ImageUpload, etc.
├── hooks/             # useAuth, useRecipes, useFavorites, useDebounce
├── layouts/           # AuthLayout, MainLayout, ProtectedRoute
├── lib/               # supabaseClient, validators, i18n
├── locales/           # pt-BR, en-US
├── pages/             # Home, Login, Register, RecipeDetail, etc.
├── stores/            # useToastStore, useShoppingStore
└── types/             # recipe.ts
```

## Banco de dados (PostgreSQL)

Todas as tabelas têm RLS (Row Level Security):

- **categories** — pública (leitura), seed de 10 categorias
- **recipes** — cada usuário vê/edita apenas as suas
- **favorites** — cada usuário gerencia os seus

## Deploy (AWS Free Tier)

```powershell
npm run build
aws s3 sync dist/ s3://<bucket> --delete
aws cloudfront create-invalidation --distribution-id <id> --paths "/*"
```

Recursos criados: S3 (5GB), CloudFront (1TB/mês), tudo dentro do Free Tier.

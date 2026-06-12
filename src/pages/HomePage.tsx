import { useSearchParams, useNavigate } from 'react-router-dom'
import { useMemo } from 'react'
import { useRecipes, useCategories } from '../hooks/useRecipes'
import { useDebounce } from '../hooks/useDebounce'
import RecipeCard from '../components/recipe/RecipeCard'
import RecipeCardSkeleton from '../components/ui/RecipeCardSkeleton'
import EmptyState from '../components/ui/EmptyState'
import type { Difficulty } from '../types/recipe'

const difficulties: { value: Difficulty | ''; label: string }[] = [
  { value: '', label: 'Todas' },
  { value: 'easy', label: 'Fácil' },
  { value: 'medium', label: 'Médio' },
  { value: 'hard', label: 'Difícil' },
]

function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const { data: recipes, isLoading } = useRecipes()
  const { data: categories } = useCategories()

  const searchQuery = useDebounce(searchParams.get('q') ?? '', 300)
  const selectedCategory = searchParams.get('category') ?? ''
  const selectedDifficulty = searchParams.get('difficulty') ?? ''

  const filtered = useMemo(() => {
    if (!recipes) return []

    return recipes.filter((r) => {
      if (searchQuery && !r.title.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false
      }
      if (selectedCategory && r.category_id !== selectedCategory) {
        return false
      }
      if (selectedDifficulty && r.difficulty !== selectedDifficulty) {
        return false
      }
      return true
    })
  }, [recipes, searchQuery, selectedCategory, selectedDifficulty])

  const setParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams)
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    setSearchParams(params)
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <RecipeCardSkeleton key={i} />
        ))}
      </div>
    )
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <select
          value={selectedCategory}
          onChange={(e) => setParam('category', e.target.value)}
          className="px-3 py-1.5 text-sm border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
        >
          <option value="">Todas categorias</option>
          {categories?.map((c) => (
            <option key={c.id} value={c.id}>{c.icon} {c.name}</option>
          ))}
        </select>

        <div className="flex gap-1.5">
          {difficulties.map((d) => (
            <button
              key={d.value}
              onClick={() => setParam('difficulty', d.value)}
              className={`px-3 py-1.5 text-sm rounded-lg border cursor-pointer transition-all ${
                selectedDifficulty === d.value
                  ? 'bg-primary text-white border-primary'
                  : 'bg-white text-stone-600 border-border hover:border-primary/50 hover:text-primary'
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>

        {searchQuery && (
          <span className="text-sm text-stone-500 ml-auto">
            {filtered.length} receita{filtered.length !== 1 ? 's' : ''} encontrada{filtered.length !== 1 ? 's' : ''}
          </span>
        )}

        <button
          onClick={() => navigate('/recipes/new')}
          className="ml-auto px-4 py-1.5 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors cursor-pointer md:hidden"
        >
          Nova Receita
        </button>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          message={searchQuery ? 'Nenhuma receita encontrada para esta busca' : 'Nenhuma receita cadastrada ainda'}
          action={!searchQuery ? { label: 'Criar primeira receita', onClick: () => navigate('/recipes/new') } : undefined}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  )
}

export default HomePage

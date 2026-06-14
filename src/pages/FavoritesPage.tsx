import { useFavorites } from '../hooks/useFavorites'
import { useRecipes } from '../hooks/useRecipes'
import RecipeCard from '../components/recipe/RecipeCard'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import EmptyState from '../components/ui/EmptyState'
import { useTranslation } from 'react-i18next'

export default function FavoritesPage() {
  const { t } = useTranslation()
  const { data: favorites, isLoading: favLoading } = useFavorites()
  const { data: recipes, isLoading: recipesLoading } = useRecipes()

  const favoriteRecipes = recipes?.filter((r) =>
    favorites?.some((f) => f.recipe_id === r.id)
  )

  if (favLoading || recipesLoading) return <LoadingSpinner />

  if (!favoriteRecipes?.length) {
    return <EmptyState message={t('favorites.empty')} />
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-stone-800 mb-6 flex items-center gap-2">
        {t('favorites.title')}
        {favoriteRecipes.length > 0 && (
          <span className="text-sm font-normal text-stone-400">({favoriteRecipes.length})</span>
        )}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {favoriteRecipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  )
}

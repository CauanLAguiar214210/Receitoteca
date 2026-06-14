import { Link } from 'react-router-dom'
import { Clock, Users, ChefHat } from 'lucide-react'
import type { Recipe } from '../../types/recipe'
import { useTranslation } from 'react-i18next'

const difficultyColor: Record<string, string> = {
  easy: 'bg-emerald-100 text-emerald-700',
  medium: 'bg-accent/20 text-accent-dark',
  hard: 'bg-danger/10 text-danger',
}

interface RecipeCardProps {
  recipe: Recipe
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  const { t } = useTranslation()

  return (
    <Link
      to={`/recipes/${recipe.id}`}
      className="block bg-white rounded-xl shadow-sm border border-border overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all duration-300 group"
    >
      <div className="h-40 bg-gradient-to-br from-primary-light via-amber-50 to-orange-100 flex items-center justify-center relative overflow-hidden">
        {recipe.image_url ? (
          <img src={recipe.image_url} alt={recipe.title} className="size-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <ChefHat size={48} className="text-primary/30" />
        )}
        {recipe.difficulty && (
          <span className={`absolute top-2 right-2 px-2 py-0.5 rounded-full text-[11px] font-medium ${difficultyColor[recipe.difficulty]}`}>
            {t(`home.${recipe.difficulty}`)}
          </span>
        )}
      </div>
      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-stone-800 truncate group-hover:text-primary transition-colors">{recipe.title}</h3>
        <div className="flex flex-wrap gap-3 text-xs text-stone-500">
          {recipe.prep_time && (
            <span className="flex items-center gap-1">
              <Clock size={14} /> {recipe.prep_time}min
            </span>
          )}
          {recipe.servings && (
            <span className="flex items-center gap-1">
              <Users size={14} /> {t('recipe.detail.servings', { count: recipe.servings })}
            </span>
          )}
          {recipe.difficulty && (
            <span className="flex items-center gap-1">
              <ChefHat size={14} /> {t(`home.${recipe.difficulty}`)}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}

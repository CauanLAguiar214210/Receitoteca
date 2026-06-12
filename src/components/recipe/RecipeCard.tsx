import { Link } from 'react-router-dom'
import { Clock, Users, ChefHat } from 'lucide-react'
import type { Recipe } from '../../types/recipe'

const difficultyLabel: Record<string, string> = {
  easy: 'Fácil',
  medium: 'Médio',
  hard: 'Difícil',
}

interface RecipeCardProps {
  recipe: Recipe
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <Link
      to={`/recipes/${recipe.id}`}
      className="block bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden hover:shadow-md transition-shadow"
    >
      <div className="h-40 bg-stone-100 flex items-center justify-center text-4xl">
        {recipe.image_url ? (
          <img src={recipe.image_url} alt={recipe.title} className="size-full object-cover" />
        ) : (
          '🍽️'
        )}
      </div>
      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-stone-800 truncate">{recipe.title}</h3>
        <div className="flex flex-wrap gap-3 text-xs text-stone-500">
          {recipe.prep_time && (
            <span className="flex items-center gap-1">
              <Clock size={14} /> {recipe.prep_time}min
            </span>
          )}
          {recipe.servings && (
            <span className="flex items-center gap-1">
              <Users size={14} /> {recipe.servings} porções
            </span>
          )}
          {recipe.difficulty && (
            <span className="flex items-center gap-1">
              <ChefHat size={14} /> {difficultyLabel[recipe.difficulty]}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}

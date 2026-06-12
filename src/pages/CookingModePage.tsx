import { useNavigate, useParams } from 'react-router-dom'
import { useRecipe } from '../hooks/useRecipes'
import LoadingSpinner from '../components/ui/LoadingSpinner'

export default function CookingModePage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data: recipe, isLoading } = useRecipe(id!)

  if (isLoading) return <LoadingSpinner />

  if (!recipe) {
    return (
      <div className="min-h-screen flex items-center justify-center text-stone-500">
        Receita não encontrada
      </div>
    )
  }

  const steps = recipe.instructions as string[]

  return (
    <div className="min-h-screen bg-stone-900 text-white flex flex-col">
      <div className="flex items-center justify-between px-6 py-4 border-b border-stone-700">
        <h1 className="font-semibold truncate">{recipe.title}</h1>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-1.5 text-sm bg-stone-700 hover:bg-stone-600 rounded-lg cursor-pointer"
        >
          Sair
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-8 max-w-2xl mx-auto w-full">
        <ol className="space-y-6">
          {steps.map((step, i) => (
            <li key={i} className="flex gap-4">
              <span className="text-2xl font-bold text-lime-400 shrink-0 leading-tight">
                {String(i + 1).padStart(2, '0')}
              </span>
              <p className="text-lg leading-relaxed text-stone-200">{step}</p>
            </li>
          ))}
        </ol>
      </div>

      <div className="px-6 py-4 border-t border-stone-700 text-center text-sm text-stone-500">
        {steps.length} passo{steps.length !== 1 ? 's' : ''}
      </div>
    </div>
  )
}

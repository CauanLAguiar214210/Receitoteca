import { useParams, useNavigate, Link } from 'react-router-dom'
import { Clock, Users, ChefHat, Heart, Pencil, Trash2, ArrowLeft, CookingPot, ShoppingCart } from 'lucide-react'
import { useRecipe, useDeleteRecipe } from '../hooks/useRecipes'
import { useFavorites, useToggleFavorite } from '../hooks/useFavorites'
import Button from '../components/ui/Button'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import Modal from '../components/ui/Modal'
import ShareButton from '../components/ui/ShareButton'
import { useState } from 'react'
import { useToastStore } from '../stores/useToastStore'
import { useShoppingStore } from '../stores/useShoppingStore'

const difficultyLabel: Record<string, string> = {
  easy: 'Fácil',
  medium: 'Médio',
  hard: 'Difícil',
}

export default function RecipeDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data: recipe, isLoading } = useRecipe(id!)
  const { data: favorites } = useFavorites()
  const { mutate: deleteRecipe } = useDeleteRecipe()
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const addToast = useToastStore((s) => s.addToast)

  const isFavorited = favorites?.some((f) => f.recipe_id === id)
  const { mutate: toggleFav } = useToggleFavorite(id!, !!isFavorited)

  if (isLoading) return <LoadingSpinner />

  if (!recipe) {
    return (
      <div className="text-center py-16">
        <p className="text-stone-500">Receita não encontrada</p>
        <Button variant="ghost" onClick={() => navigate('/')} className="mt-4">
          Voltar
        </Button>
      </div>
    )
  }

  const handleDelete = () => {
    deleteRecipe(id!, {
      onSuccess: () => {
        addToast('Receita excluída com sucesso')
        navigate('/')
      },
      onError: () => addToast('Erro ao excluir receita', 'error'),
    })
  }

  return (
    <div className="max-w-2xl mx-auto">
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-1 text-sm text-stone-500 hover:text-stone-700 mb-4 cursor-pointer"
      >
        <ArrowLeft size={16} /> Voltar
      </button>

      {recipe.image_url && (
        <div className="w-full h-64 rounded-xl overflow-hidden mb-6 bg-stone-100">
          <img src={recipe.image_url} alt={recipe.title} className="size-full object-cover" />
        </div>
      )}

      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-stone-800">{recipe.title}</h1>
          {recipe.description && (
            <p className="text-stone-500 mt-1">{recipe.description}</p>
          )}
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => toggleFav()}
            className={`p-2 rounded-full cursor-pointer ${
              isFavorited ? 'text-red-500' : 'text-stone-400 hover:text-red-500'
            }`}
          >
            <Heart size={22} fill={isFavorited ? 'currentColor' : 'none'} />
          </button>
          <button
            onClick={() => navigate(`/recipes/${id}/edit`)}
            className="p-2 rounded-full text-stone-400 hover:text-lime-600 cursor-pointer"
          >
            <Pencil size={20} />
          </button>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="p-2 rounded-full text-stone-400 hover:text-red-600 cursor-pointer"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 mt-4">
        <Link
          to={`/recipes/${id}/cook`}
          className="flex items-center gap-1.5 px-4 py-2 bg-lime-600 text-white rounded-lg hover:bg-lime-700 text-sm font-medium"
        >
          <CookingPot size={18} />
          Modo Preparo
        </Link>

        <ShareButton title={recipe.title} />

        <button
          onClick={() => {
            const ings = (recipe.ingredients as { name: string; amount: number; unit: string }[])
              .map((i) => `${i.amount} ${i.unit} de ${i.name}`)
            useShoppingStore.getState().addItems(ings, recipe.title)
            addToast('Ingredientes adicionados à lista de compras')
          }}
          className="flex items-center gap-1.5 text-sm text-stone-500 hover:text-lime-600 cursor-pointer"
        >
          <ShoppingCart size={18} />
          Lista de Compras
        </button>
      </div>

      <div className="flex flex-wrap gap-4 mt-4 text-sm text-stone-600">
        {recipe.prep_time && (
          <span className="flex items-center gap-1.5"><Clock size={16} /> Preparo: {recipe.prep_time}min</span>
        )}
        {recipe.cook_time && (
          <span className="flex items-center gap-1.5"><Clock size={16} /> Cozimento: {recipe.cook_time}min</span>
        )}
        {recipe.servings && (
          <span className="flex items-center gap-1.5"><Users size={16} /> {recipe.servings} porções</span>
        )}
        {recipe.difficulty && (
          <span className="flex items-center gap-1.5"><ChefHat size={16} /> {difficultyLabel[recipe.difficulty]}</span>
        )}
      </div>

      <section className="mt-8">
        <h2 className="text-lg font-semibold text-stone-800 mb-3">Ingredientes</h2>
        <ul className="space-y-2">
          {(recipe.ingredients as { name: string; amount: number; unit: string }[]).map((ing, i) => (
            <li key={i} className="flex items-center gap-2 text-stone-700">
              <span className="size-1.5 rounded-full bg-lime-500" />
              {ing.amount} {ing.unit} de {ing.name}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-semibold text-stone-800 mb-3">Modo de Preparo</h2>
        <ol className="space-y-3">
          {(recipe.instructions as string[]).map((step, i) => (
            <li key={i} className="flex gap-3 text-stone-700">
              <span className="font-bold text-lime-600 shrink-0">{i + 1}.</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </section>

      <Modal
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Excluir Receita"
      >
        <p className="text-stone-600 mb-4">Tem certeza que deseja excluir esta receita? Esta ação não pode ser desfeita.</p>
        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Cancelar</Button>
          <Button variant="danger" onClick={handleDelete}>Excluir</Button>
        </div>
      </Modal>
    </div>
  )
}

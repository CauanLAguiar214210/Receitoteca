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
import { useTranslation } from 'react-i18next'

const difficultyColor: Record<string, string> = {
  easy: 'bg-emerald-100 text-emerald-700',
  medium: 'bg-accent/20 text-accent-dark',
  hard: 'bg-danger/10 text-danger',
}

export default function RecipeDetailPage() {
  const { t } = useTranslation()
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
        <p className="text-stone-500">{t('recipe.detail.notFound')}</p>
        <Button variant="ghost" onClick={() => navigate('/')} className="mt-4">
          {t('recipe.detail.back')}
        </Button>
      </div>
    )
  }

  const handleDelete = () => {
    deleteRecipe(id!, {
      onSuccess: () => {
        addToast(t('recipe.detail.deleteSuccess'))
        navigate('/')
      },
      onError: () => addToast(t('recipe.detail.deleteError'), 'error'),
    })
  }

  return (
    <div className="max-w-2xl mx-auto">
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-1 text-sm text-stone-500 hover:text-stone-700 mb-4 transition-colors cursor-pointer"
      >
        <ArrowLeft size={16} /> Voltar
      </button>

      {recipe.image_url ? (
        <div className="w-full h-64 md:h-80 rounded-2xl overflow-hidden mb-6 bg-primary-light relative">
          <img src={recipe.image_url} alt={recipe.title} className="size-full object-cover" />
        </div>
      ) : (
        <div className="w-full h-48 md:h-64 rounded-2xl overflow-hidden mb-6 bg-gradient-to-br from-primary-light via-amber-50 to-orange-100 flex items-center justify-center">
          <ChefHat size={64} className="text-primary/30" />
        </div>
      )}

      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            {recipe.difficulty && (
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${difficultyColor[recipe.difficulty]}`}>
                {t(`home.${recipe.difficulty}`)}
              </span>
            )}
            {recipe.cook_time && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-light text-primary">
                {recipe.cook_time}min
              </span>
            )}
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-stone-800">{recipe.title}</h1>
          {recipe.description && (
            <p className="text-stone-500 mt-1.5">{recipe.description}</p>
          )}
        </div>

        <div className="flex gap-1 shrink-0">
          <button
            onClick={() => toggleFav()}
            className={`p-2 rounded-full transition-colors cursor-pointer ${
              isFavorited ? 'text-danger' : 'text-stone-400 hover:text-danger'
            }`}
          >
            <Heart size={22} fill={isFavorited ? 'currentColor' : 'none'} />
          </button>
          <button
            onClick={() => navigate(`/recipes/${id}/edit`)}
            className="p-2 rounded-full text-stone-400 hover:text-primary transition-colors cursor-pointer"
          >
            <Pencil size={20} />
          </button>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="p-2 rounded-full text-stone-400 hover:text-danger transition-colors cursor-pointer"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 mt-6">
        <Link
          to={`/recipes/${id}/cook`}
          className="flex items-center gap-1.5 px-5 py-2.5 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors text-sm font-medium shadow-lg shadow-primary/25"
        >
          <CookingPot size={18} />
          {t('recipe.detail.cookMode')}
        </Link>

        <ShareButton title={recipe.title} />

        <button
          onClick={() => {
            const ings = (recipe.ingredients as { name: string; amount: number; unit: string }[])
              .map((i) => `${i.amount} ${i.unit} de ${i.name}`)
            useShoppingStore.getState().addItems(ings, recipe.title)
            addToast(t('recipe.detail.addedToList'))
          }}
          className="flex items-center gap-1.5 px-4 py-2.5 text-sm text-stone-600 border border-border rounded-xl hover:border-primary/50 hover:text-primary transition-colors cursor-pointer"
        >
          <ShoppingCart size={18} />
          {t('recipe.detail.shoppingList')}
        </button>
      </div>

      <div className="flex flex-wrap gap-4 mt-6 text-sm text-stone-600">
        {recipe.prep_time && (
          <span className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-100 rounded-lg"><Clock size={16} /> {t('recipe.detail.prepTime', { time: recipe.prep_time })}</span>
        )}
        {recipe.cook_time && (
          <span className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-100 rounded-lg"><Clock size={16} /> {t('recipe.detail.cookTime', { time: recipe.cook_time })}</span>
        )}
        {recipe.servings && (
          <span className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-100 rounded-lg"><Users size={16} /> {t('recipe.detail.servings', { count: recipe.servings })}</span>
        )}
        {recipe.difficulty && (
          <span className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-100 rounded-lg"><ChefHat size={16} /> {t(`home.${recipe.difficulty}`)}</span>
        )}
      </div>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-stone-800 mb-4 flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-primary" />
          {t('recipe.detail.ingredients')}
        </h2>
        <div className="bg-stone-50 rounded-xl p-5 border border-border">
          <ul className="space-y-2.5">
            {(recipe.ingredients as { name: string; amount: number; unit: string }[]).map((ing, i) => (
              <li key={i} className="flex items-center gap-3 text-stone-700">
                <span className="size-2 rounded-full bg-primary/40 shrink-0" />
                <span><strong className="font-medium">{ing.amount}</strong> {ing.unit} de {ing.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-stone-800 mb-4 flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-primary" />
          {t('recipe.detail.instructions')}
        </h2>
        <ol className="space-y-4">
          {(recipe.instructions as string[]).map((step, i) => (
            <li key={i} className="flex gap-4 p-4 bg-white rounded-xl border border-border">
              <span className="size-7 rounded-full bg-primary text-white text-sm font-bold flex items-center justify-center shrink-0 mt-0.5">
                {i + 1}
              </span>
              <span className="text-stone-700 leading-relaxed">{step}</span>
            </li>
          ))}
        </ol>
      </section>

      <Modal
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title={t('recipe.detail.deleteTitle')}
      >
        <p className="text-stone-600 mb-4">{t('recipe.detail.deleteConfirm')}</p>
        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>{t('common.cancel')}</Button>
          <Button variant="danger" onClick={handleDelete}>{t('common.delete')}</Button>
        </div>
      </Modal>
    </div>
  )
}

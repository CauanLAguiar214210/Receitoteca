import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus, Trash2, ArrowLeft } from 'lucide-react'
import { recipeSchema, type RecipeFormData } from '../lib/validators'
import { useRecipe, useCreateRecipe, useUpdateRecipe, useCategories } from '../hooks/useRecipes'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import Textarea from '../components/ui/Textarea'
import Select from '../components/ui/Select'
import ImageUpload from '../components/ui/ImageUpload'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import { useToastStore } from '../stores/useToastStore'
import { useTranslation } from 'react-i18next'

export default function RecipeFormPage() {
  const { t } = useTranslation()
  const { id } = useParams<{ id: string }>()
  const isEditing = !!id
  const navigate = useNavigate()
  const { data: recipe, isLoading } = useRecipe(id ?? '')
  const { data: categories } = useCategories()
  const { mutate: create, isPending: creating } = useCreateRecipe()
  const { mutate: update, isPending: updating } = useUpdateRecipe(id ?? '')

  const {
    register,
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<RecipeFormData>({
    resolver: zodResolver(recipeSchema),
    defaultValues: {
      title: '',
      description: '',
      ingredients: [{ name: '', amount: 0, unit: '' }],
      instructions: [''],
      prep_time: undefined,
      cook_time: undefined,
      servings: undefined,
      difficulty: undefined,
      category_id: undefined,
    },
  })

  const {
    fields: ingFields,
    append: appendIng,
    remove: removeIng,
  } = useFieldArray({ control, name: 'ingredients' as never })

  const {
    fields: instFields,
    append: appendInst,
    remove: removeInst,
  } = useFieldArray({ control, name: 'instructions' as never })

  useEffect(() => {
    if (isEditing && recipe) {
      reset({
        title: recipe.title,
        description: recipe.description ?? '',
        ingredients: (recipe.ingredients as RecipeFormData['ingredients']) ?? [{ name: '', amount: 0, unit: '' }],
        instructions: (recipe.instructions as string[]) ?? [''],
        prep_time: recipe.prep_time ?? undefined,
        cook_time: recipe.cook_time ?? undefined,
        servings: recipe.servings ?? undefined,
        difficulty: recipe.difficulty ?? undefined,
        category_id: recipe.category_id ?? undefined,
      })
    }
  }, [recipe, isEditing, reset])

  const addToast = useToastStore((s) => s.addToast)

  const onSubmit = (data: RecipeFormData) => {
    if (isEditing) {
      update(data, {
        onSuccess: () => {
          addToast(t('recipe.form.updatedSuccess'))
          navigate(`/recipes/${id}`)
        },
        onError: () => addToast(t('recipe.form.updateError'), 'error'),
      })
    } else {
      create(data, {
        onSuccess: (newRecipe) => {
          addToast(t('recipe.form.createdSuccess'))
          navigate(`/recipes/${newRecipe.id}`)
        },
        onError: () => addToast(t('recipe.form.createError'), 'error'),
      })
    }
  }

  if (isEditing && isLoading) return <LoadingSpinner />

  const categoryOptions = (categories ?? []).map((c) => ({
    value: c.id,
    label: `${c.icon ?? ''} ${c.name}`,
  }))

  const difficultyOptions = [
    { value: 'easy', label: t('home.easy') },
    { value: 'medium', label: t('home.medium') },
    { value: 'hard', label: t('home.hard') },
  ]

  return (
    <div className="max-w-2xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1 text-sm text-stone-500 hover:text-stone-700 mb-4 cursor-pointer"
      >
        <ArrowLeft size={16} /> {t('recipe.form.back')}
      </button>

      <h1 className="text-2xl font-bold text-stone-800 mb-6">
        {isEditing ? t('recipe.form.editTitle') : t('recipe.form.newTitle')}
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <ImageUpload
          onUpload={(url) => setValue('image_url' as never, url as never)}
          currentImage={(recipe as any)?.image_url}
        />

        <Input
          label={t('recipe.form.titleLabel')}
          error={errors.title?.message}
          {...register('title')}
        />

        <Textarea
          label={t('recipe.form.descriptionLabel')}
          rows={3}
          error={errors.description?.message}
          {...register('description')}
        />

        <div className="grid grid-cols-2 gap-4">
          <Input label={t('recipe.form.prepTimeLabel')} type="number" {...register('prep_time', { valueAsNumber: true })} />
          <Input label={t('recipe.form.cookTimeLabel')} type="number" {...register('cook_time', { valueAsNumber: true })} />
          <Input label={t('recipe.form.servingsLabel')} type="number" {...register('servings', { valueAsNumber: true })} />

          <Select
            label={t('recipe.form.difficultyLabel')}
            placeholder={t('recipe.form.selectPlaceholder')}
            options={difficultyOptions}
            {...register('difficulty')}
          />

          <div className="col-span-2">
            <Select
              label={t('recipe.form.categoryLabel')}
              placeholder={t('recipe.form.selectPlaceholder')}
              options={categoryOptions}
              {...register('category_id')}
            />
          </div>
        </div>

        <section>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-stone-700">{t('recipe.form.ingredientsSection')}</label>
            <button
              type="button"
              onClick={() => appendIng({ name: '', amount: 0, unit: '' })}
              className="flex items-center gap-1 text-sm text-primary hover:text-primary-dark cursor-pointer"
            >
              <Plus size={16} /> {t('recipe.form.addIngredient')}
            </button>
          </div>
          {errors.ingredients && (
            <p className="text-sm text-red-600 mb-2">{errors.ingredients.message || errors.ingredients.root?.message}</p>
          )}
          <div className="space-y-3">
            {ingFields.map((field, i) => (
              <div key={field.id} className="flex gap-2 items-start">
                <Input
                  label=""
                  placeholder={t('recipe.form.namePlaceholder')}
                  className="flex-1"
                  {...register(`ingredients.${i}.name`)}
                />
                <Input
                  label=""
                  type="number"
                  step="any"
                  placeholder={t('recipe.form.qtyPlaceholder')}
                  className="w-20"
                  {...register(`ingredients.${i}.amount`, { valueAsNumber: true })}
                />
                <Input
                  label=""
                  placeholder={t('recipe.form.unitPlaceholder')}
                  className="w-20"
                  {...register(`ingredients.${i}.unit`)}
                />
                {ingFields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeIng(i)}
                    className="mt-2 text-stone-400 hover:text-red-600 cursor-pointer"
                  >
                    <Trash2 size={18} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-stone-700">{t('recipe.form.instructionsSection')}</label>
            <Button
              type="button"
              variant="ghost"
              onClick={() => appendInst('')}
              className="text-primary text-sm"
            >
              <Plus size={16} /> {t('recipe.form.addStep')}
            </Button>
          </div>
          {errors.instructions && (
            <p className="text-sm text-red-600 mb-2">{errors.instructions.message || errors.instructions.root?.message}</p>
          )}
          <div className="space-y-3">
            {instFields.map((field, i) => (
              <div key={field.id} className="flex gap-2 items-start">
                <span className="text-sm font-bold text-primary mt-2.5 shrink-0">{i + 1}.</span>
                <Textarea
                  label=""
                  rows={2}
                  placeholder={t('recipe.form.stepPlaceholder', { number: i + 1 })}
                  className="flex-1"
                  {...register(`instructions.${i}`)}
                />
                {instFields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeInst(i)}
                    className="mt-2 text-stone-400 hover:text-red-600 cursor-pointer"
                  >
                    <Trash2 size={18} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>

        <div className="flex justify-end gap-3 pt-4 border-t border-stone-200">
          <Button type="button" variant="secondary" onClick={() => navigate(-1)}>
            {t('recipe.form.cancel')}
          </Button>
          <Button type="submit" disabled={creating || updating}>
            {creating || updating ? t('common.saving') : isEditing ? t('recipe.form.submitUpdate') : t('recipe.form.submitCreate')}
          </Button>
        </div>
      </form>
    </div>
  )
}

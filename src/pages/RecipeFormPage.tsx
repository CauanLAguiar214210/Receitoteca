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

export default function RecipeFormPage() {
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
          addToast('Receita atualizada com sucesso')
          navigate(`/recipes/${id}`)
        },
        onError: () => addToast('Erro ao atualizar receita', 'error'),
      })
    } else {
      create(data, {
        onSuccess: (newRecipe) => {
          addToast('Receita criada com sucesso')
          navigate(`/recipes/${newRecipe.id}`)
        },
        onError: () => addToast('Erro ao criar receita', 'error'),
      })
    }
  }

  if (isEditing && isLoading) return <LoadingSpinner />

  const categoryOptions = (categories ?? []).map((c) => ({
    value: c.id,
    label: `${c.icon ?? ''} ${c.name}`,
  }))

  return (
    <div className="max-w-2xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1 text-sm text-stone-500 hover:text-stone-700 mb-4 cursor-pointer"
      >
        <ArrowLeft size={16} /> Voltar
      </button>

      <h1 className="text-2xl font-bold text-stone-800 mb-6">
        {isEditing ? 'Editar Receita' : 'Nova Receita'}
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <ImageUpload
          onUpload={(url) => setValue('image_url' as never, url as never)}
          currentImage={(recipe as any)?.image_url}
        />

        <Input
          label="Título"
          error={errors.title?.message}
          {...register('title')}
        />

        <Textarea
          label="Descrição"
          rows={3}
          error={errors.description?.message}
          {...register('description')}
        />

        <div className="grid grid-cols-2 gap-4">
          <Input label="Tempo de preparo (min)" type="number" {...register('prep_time', { valueAsNumber: true })} />
          <Input label="Tempo de cozimento (min)" type="number" {...register('cook_time', { valueAsNumber: true })} />
          <Input label="Porções" type="number" {...register('servings', { valueAsNumber: true })} />

          <Select
            label="Dificuldade"
            placeholder="Selecione"
            options={[
              { value: 'easy', label: 'Fácil' },
              { value: 'medium', label: 'Médio' },
              { value: 'hard', label: 'Difícil' },
            ]}
            {...register('difficulty')}
          />

          <div className="col-span-2">
            <Select
              label="Categoria"
              placeholder="Selecione"
              options={categoryOptions}
              {...register('category_id')}
            />
          </div>
        </div>

        <section>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-stone-700">Ingredientes</label>
            <button
              type="button"
              onClick={() => appendIng({ name: '', amount: 0, unit: '' })}
              className="flex items-center gap-1 text-sm text-lime-600 hover:text-lime-700 cursor-pointer"
            >
              <Plus size={16} /> Adicionar
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
                  placeholder="Nome"
                  className="flex-1"
                  {...register(`ingredients.${i}.name`)}
                />
                <Input
                  label=""
                  type="number"
                  step="any"
                  placeholder="Qtd"
                  className="w-20"
                  {...register(`ingredients.${i}.amount`, { valueAsNumber: true })}
                />
                <Input
                  label=""
                  placeholder="Un"
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
            <label className="text-sm font-medium text-stone-700">Modo de Preparo</label>
            <Button
              type="button"
              variant="ghost"
              onClick={() => appendInst('')}
              className="text-lime-600 text-sm"
            >
              <Plus size={16} /> Adicionar passo
            </Button>
          </div>
          {errors.instructions && (
            <p className="text-sm text-red-600 mb-2">{errors.instructions.message || errors.instructions.root?.message}</p>
          )}
          <div className="space-y-3">
            {instFields.map((field, i) => (
              <div key={field.id} className="flex gap-2 items-start">
                <span className="text-sm font-bold text-lime-600 mt-2.5 shrink-0">{i + 1}.</span>
                <Textarea
                  label=""
                  rows={2}
                  placeholder={`Passo ${i + 1}`}
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
            Cancelar
          </Button>
          <Button type="submit" disabled={creating || updating}>
            {creating || updating ? 'Salvando...' : isEditing ? 'Atualizar' : 'Criar Receita'}
          </Button>
        </div>
      </form>
    </div>
  )
}

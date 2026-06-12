import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '../lib/supabaseClient'
import type { Recipe } from '../types/recipe'
import type { RecipeFormData } from '../lib/validators'

async function getRecipes(): Promise<Recipe[]> {
  const { data, error } = await supabase
    .from('recipes')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

async function getRecipe(id: string): Promise<Recipe> {
  const { data, error } = await supabase
    .from('recipes')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return data
}

async function createRecipe(form: RecipeFormData) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Usuário não autenticado')

  const { data, error } = await supabase
    .from('recipes')
    .insert({ ...form, user_id: user.id })
    .select()
    .single()

  if (error) throw error
  return data
}

async function updateRecipe(id: string, form: Partial<RecipeFormData>) {
  const { data, error } = await supabase
    .from('recipes')
    .update(form)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

async function deleteRecipe(id: string) {
  const { error } = await supabase
    .from('recipes')
    .delete()
    .eq('id', id)

  if (error) throw error
}

async function getCategories() {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name')

  if (error) throw error
  return data
}

export function useRecipes() {
  return useQuery({
    queryKey: ['recipes'],
    queryFn: getRecipes,
  })
}

export function useRecipe(id: string) {
  return useQuery({
    queryKey: ['recipes', id],
    queryFn: () => getRecipe(id),
    enabled: !!id,
  })
}

export function useCreateRecipe() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: createRecipe,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['recipes'] }),
  })
}

export function useUpdateRecipe(id: string) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (form: Partial<RecipeFormData>) => updateRecipe(id, form),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['recipes'] }),
  })
}

export function useDeleteRecipe() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: deleteRecipe,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['recipes'] }),
  })
}

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  })
}

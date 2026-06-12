import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '../lib/supabaseClient'
import type { Favorite } from '../types/recipe'

async function getFavorites(): Promise<Favorite[]> {
  const { data, error } = await supabase
    .from('favorites')
    .select('*')

  if (error) throw error
  return data
}

async function toggleFavorite(recipeId: string, isFavorited: boolean) {
  if (isFavorited) {
    const { error } = await supabase
      .from('favorites')
      .delete()
      .eq('recipe_id', recipeId)

    if (error) throw error
  } else {
    const { data: { user } } = await supabase.auth.getUser()

    const { error } = await supabase
      .from('favorites')
      .insert({ recipe_id: recipeId, user_id: user!.id })

    if (error) throw error
  }
}

export function useFavorites() {
  return useQuery({
    queryKey: ['favorites'],
    queryFn: getFavorites,
  })
}

export function useToggleFavorite(recipeId: string, isFavorited: boolean) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: () => toggleFavorite(recipeId, isFavorited),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['favorites'] })
      qc.invalidateQueries({ queryKey: ['recipes'] })
    },
  })
}

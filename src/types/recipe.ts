export interface Category {
  id: string
  name: string
  icon: string | null
}

export type Difficulty = 'easy' | 'medium' | 'hard'

export interface Ingredient {
  name: string
  amount: number
  unit: string
}

export interface Recipe {
  id: string
  user_id: string
  title: string
  description: string | null
  ingredients: Ingredient[]
  instructions: string[]
  prep_time: number | null
  cook_time: number | null
  servings: number | null
  difficulty: Difficulty | null
  category_id: string | null
  image_url: string | null
  created_at: string
  updated_at: string
}

export interface Favorite {
  id: string
  user_id: string
  recipe_id: string
}

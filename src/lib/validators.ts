import { z } from 'zod'

export const ingredientSchema = z.object({
  name: z.string().min(1, 'Ingrediente é obrigatório'),
  amount: z.number().positive('Quantidade deve ser positiva'),
  unit: z.string().min(1, 'Unidade é obrigatória'),
})

export const recipeSchema = z.object({
  title: z.string().min(3, 'Título deve ter no mínimo 3 caracteres'),
  description: z.string().optional(),
  ingredients: z.array(ingredientSchema).min(1, 'Adicione pelo menos 1 ingrediente'),
  instructions: z.array(z.string().min(1)).min(1, 'Adicione pelo menos 1 instrução'),
  prep_time: z.number().positive('Tempo deve ser positivo').optional(),
  cook_time: z.number().positive('Tempo deve ser positivo').optional(),
  servings: z.number().positive('Porções deve ser positiva').optional(),
  difficulty: z.enum(['easy', 'medium', 'hard']).optional(),
  category_id: z.string().uuid().optional(),
  image_url: z.string().optional(),
})

export type RecipeFormData = z.infer<typeof recipeSchema>

export const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
})

export type LoginFormData = z.infer<typeof loginSchema>

export const registerSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Senhas não conferem',
  path: ['confirmPassword'],
})

export type RegisterFormData = z.infer<typeof registerSchema>

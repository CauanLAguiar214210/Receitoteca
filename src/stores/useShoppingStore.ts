import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface ShoppingItem {
  ingredient: string
  recipeTitle: string
  checked: boolean
}

interface ShoppingStore {
  items: ShoppingItem[]
  addItems: (ingredients: string[], recipeTitle: string) => void
  toggleItem: (index: number) => void
  removeItem: (index: number) => void
  clearAll: () => void
}

export const useShoppingStore = create<ShoppingStore>()(
  persist(
    (set) => ({
      items: [],
      addItems: (ingredients, recipeTitle) =>
        set((state) => ({
          items: [
            ...state.items,
            ...ingredients.map((ingredient) => ({
              ingredient,
              recipeTitle,
              checked: false,
            })),
          ],
        })),
      toggleItem: (index) =>
        set((state) => ({
          items: state.items.map((item, i) =>
            i === index ? { ...item, checked: !item.checked } : item
          ),
        })),
      removeItem: (index) =>
        set((state) => ({
          items: state.items.filter((_, i) => i !== index),
        })),
      clearAll: () => set({ items: [] }),
    }),
    { name: 'shopping-list' }
  )
)

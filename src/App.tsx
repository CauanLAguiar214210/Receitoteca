import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ToastContainer from './components/ui/ToastContainer'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import RecipeDetailPage from './pages/RecipeDetailPage'
import RecipeFormPage from './pages/RecipeFormPage'
import FavoritesPage from './pages/FavoritesPage'
import ShoppingListPage from './pages/ShoppingListPage'
import CookingModePage from './pages/CookingModePage'
import AuthLayout from './layouts/AuthLayout'
import MainLayout from './layouts/MainLayout'
import ProtectedRoute from './layouts/ProtectedRoute'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route element={<MainLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/recipes/new" element={<RecipeFormPage />} />
              <Route path="/recipes/:id" element={<RecipeDetailPage />} />
              <Route path="/recipes/:id/edit" element={<RecipeFormPage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="/shopping-list" element={<ShoppingListPage />} />
            </Route>
            <Route path="/recipes/:id/cook" element={<CookingModePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App

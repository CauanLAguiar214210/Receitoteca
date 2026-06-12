import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { LogOut, Heart, Plus, Search, ShoppingCart } from 'lucide-react'

export default function Header() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <header className="bg-white border-b border-stone-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center gap-4">
        <Link to="/" className="text-xl font-bold text-stone-800 shrink-0">
          🍽️ Receitas
        </Link>

        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            placeholder="Buscar receitas..."
            value={searchParams.get('q') ?? ''}
            onChange={(e) => {
              const params = new URLSearchParams(searchParams)
              if (e.target.value) {
                params.set('q', e.target.value)
              } else {
                params.delete('q')
              }
              setSearchParams(params)
            }}
            className="w-full pl-9 pr-3 py-2 text-sm border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500"
          />
        </div>

        <nav className="flex items-center gap-4 shrink-0">
          <Link
            to="/recipes/new"
            className="flex items-center gap-1.5 text-sm font-medium text-lime-600 hover:text-lime-700"
          >
            <Plus size={18} />
            Nova Receita
          </Link>

          <Link
            to="/favorites"
            className="flex items-center gap-1.5 text-sm font-medium text-stone-600 hover:text-stone-800"
          >
            <Heart size={18} />
            Favoritos
          </Link>

          <Link
            to="/shopping-list"
            className="flex items-center gap-1.5 text-sm font-medium text-stone-600 hover:text-stone-800"
          >
            <ShoppingCart size={18} />
            Compras
          </Link>

          <div className="flex items-center gap-3 pl-4 border-l border-stone-200">
            <span className="text-sm text-stone-500 max-w-28 truncate">{user?.email}</span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 text-sm text-stone-500 hover:text-red-600 cursor-pointer shrink-0"
            >
              <LogOut size={16} />
              Sair
            </button>
          </div>
        </nav>
      </div>
    </header>
  )
}

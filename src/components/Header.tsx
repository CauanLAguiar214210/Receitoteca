import { Link, useNavigate, useSearchParams, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { LogOut, Heart, Plus, Search, ShoppingCart, ChefHat } from 'lucide-react'

export default function Header() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  const navLinks = [
    { to: '/', label: 'Início', exact: true },
    { to: '/favorites', label: 'Favoritos', icon: Heart },
    { to: '/shopping-list', label: 'Compras', icon: ShoppingCart },
  ]

  const isActive = (path: string, exact?: boolean) =>
    exact ? location.pathname === path : location.pathname.startsWith(path)

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-border sticky top-0 z-50 transition-all">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center gap-4">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold text-primary shrink-0">
          <span className="size-9 rounded-lg bg-primary flex items-center justify-center text-white text-base">
            <ChefHat size={20} />
          </span>
          Receitas
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
            className="w-full pl-9 pr-3 py-2 text-sm border border-border rounded-lg bg-stone-50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary focus:bg-white transition-all"
          />
        </div>

        <nav className="hidden md:flex items-center gap-1 shrink-0">
          {navLinks.map(({ to, label, icon: Icon, exact }) => (
            <Link
              key={to}
              to={to}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                isActive(to, exact)
                  ? 'text-primary bg-primary/10'
                  : 'text-stone-600 hover:text-stone-800 hover:bg-stone-100'
              }`}
            >
              {Icon && <Icon size={16} />}
              {label}
            </Link>
          ))}
        </nav>

        <Link
          to="/recipes/new"
          className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-dark transition-colors shrink-0"
        >
          <Plus size={18} />
          <span className="hidden sm:inline">Nova Receita</span>
        </Link>

        <div className="flex items-center gap-3 pl-4 border-l border-border">
          <span className="text-sm text-stone-500 max-w-24 truncate hidden sm:block">{user?.email}</span>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1 text-sm text-stone-500 hover:text-danger transition-colors cursor-pointer shrink-0"
          >
            <LogOut size={16} />
            <span className="hidden sm:inline">Sair</span>
          </button>
        </div>
      </div>
    </header>
  )
}

import { Outlet, Link } from 'react-router-dom'

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center px-4">
      <Link to="/" className="text-3xl font-bold text-stone-800 mb-8">
        🍽️ Receitas
      </Link>
      <div className="w-full max-w-sm">
        <Outlet />
      </div>
    </div>
  )
}

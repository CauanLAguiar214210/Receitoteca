import { Outlet, Link } from 'react-router-dom'
import { ChefHat } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export default function AuthLayout() {
  const { t } = useTranslation()
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light via-amber-50 to-orange-100 flex flex-col items-center justify-center px-4">
      <Link to="/" className="flex items-center gap-2.5 mb-8 group">
        <span className="size-11 rounded-xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/30 group-hover:shadow-primary/40 transition-shadow">
          <ChefHat size={24} />
        </span>
        <span className="text-2xl font-bold text-stone-800">{t('common.recipes')}</span>
      </Link>
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl shadow-stone-200/50 p-8 animate-slide-up">
        <Outlet />
      </div>
    </div>
  )
}

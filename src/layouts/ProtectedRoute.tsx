import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useTranslation } from 'react-i18next'

export default function ProtectedRoute() {
  const { t } = useTranslation()
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-stone-500">
        {t('common.loading')}
      </div>
    )
  }

  if (!user) return <Navigate to="/login" replace />

  return <Outlet />
}

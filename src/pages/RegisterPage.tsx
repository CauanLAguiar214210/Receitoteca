import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { Mail, Lock, UserPlus } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export default function RegisterPage() {
  const { t } = useTranslation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { register } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError(t('auth.register.passwordsDontMatch'))
      return
    }

    setLoading(true)
    try {
      await register(email, password)
      navigate('/login')
    } catch (err) {
      setError(err instanceof Error ? err.message : t('auth.register.fallbackError'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="text-center">
        <h2 className="text-xl font-bold text-stone-800">{t('auth.register.title')}</h2>
        <p className="text-sm text-stone-500 mt-1">{t('auth.register.subtitle')}</p>
      </div>

      {error && (
        <p className="text-sm text-danger bg-danger/5 px-3 py-2 rounded-lg border border-danger/10">{error}</p>
      )}

      <div>
        <label className="block text-sm font-medium text-stone-700 mb-1.5">{t('auth.register.emailLabel')}</label>
        <div className="relative">
          <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pl-9 pr-3 py-2 border border-border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-stone-700 mb-1.5">{t('auth.register.passwordLabel')}</label>
        <div className="relative">
          <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full pl-9 pr-3 py-2 border border-border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-stone-700 mb-1.5">{t('auth.register.confirmLabel')}</label>
        <div className="relative">
          <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full pl-9 pr-3 py-2 border border-border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            required
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-primary text-white py-2.5 rounded-lg hover:bg-primary-dark font-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
      >
        {loading ? (
          <span className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          <UserPlus size={18} />
        )}
        {loading ? t('auth.register.buttonLoading') : t('auth.register.button')}
      </button>

      <p className="text-sm text-center text-stone-500">
        {t('auth.register.hasAccount')}{' '}
        <Link to="/login" className="text-primary hover:text-primary-dark font-medium">{t('auth.register.signInLink')}</Link>
      </p>
    </form>
  )
}

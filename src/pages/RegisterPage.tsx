import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const { register } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('Senhas não conferem')
      return
    }

    try {
      await register(email, password)
      navigate('/login')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao cadastrar')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold text-stone-800 text-center">Criar Conta</h2>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded">{error}</p>
      )}

      <div>
        <label className="block text-sm font-medium text-stone-700 mb-1">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-stone-700 mb-1">Senha</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-stone-700 mb-1">Confirmar Senha</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-lime-600 text-white py-2 rounded-lg hover:bg-lime-700 font-medium"
      >
        Cadastrar
      </button>

      <p className="text-sm text-center text-stone-600">
        Já tem conta?{' '}
        <Link to="/login" className="text-lime-600 hover:underline">Entrar</Link>
      </p>
    </form>
  )
}

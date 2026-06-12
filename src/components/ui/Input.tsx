import type { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

export default function Input({ label, error, className = '', ...props }: InputProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-stone-700 mb-1">{label}</label>
      <input
        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500 ${
          error ? 'border-red-400' : 'border-stone-300'
        } ${className}`}
        {...props}
      />
      {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
    </div>
  )
}

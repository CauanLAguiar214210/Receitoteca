import type { SelectHTMLAttributes } from 'react'

interface Option {
  value: string
  label: string
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  options: Option[]
  placeholder?: string
  error?: string
}

export default function Select({ label, options, placeholder, error, className = '', ...props }: SelectProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-stone-700 mb-1">{label}</label>
      <select
        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500 bg-white ${
          error ? 'border-red-400' : 'border-stone-300'
        } ${className}`}
        {...props}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
    </div>
  )
}

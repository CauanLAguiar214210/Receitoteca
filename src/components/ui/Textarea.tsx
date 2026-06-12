import type { TextareaHTMLAttributes } from 'react'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  error?: string
}

export default function Textarea({ label, error, className = '', ...props }: TextareaProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-stone-700 mb-1">{label}</label>
      <textarea
        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500 resize-y ${
          error ? 'border-red-400' : 'border-stone-300'
        } ${className}`}
        {...props}
      />
      {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
    </div>
  )
}

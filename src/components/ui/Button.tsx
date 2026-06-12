import type { ButtonHTMLAttributes } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger'

const variants: Record<Variant, string> = {
  primary: 'bg-lime-600 text-white hover:bg-lime-700',
  secondary: 'bg-white text-stone-700 border border-stone-300 hover:bg-stone-50',
  ghost: 'text-stone-600 hover:text-stone-800 hover:bg-stone-100',
  danger: 'bg-red-600 text-white hover:bg-red-700',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
}

export default function Button({ variant = 'primary', className = '', ...props }: ButtonProps) {
  return (
    <button
      className={`px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-50 cursor-pointer ${variants[variant]} ${className}`}
      {...props}
    />
  )
}

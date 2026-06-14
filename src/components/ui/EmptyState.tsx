import { ChefHat } from 'lucide-react'

interface EmptyStateProps {
  message?: string
  action?: { label: string; onClick: () => void }
}

export default function EmptyState({ message, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-stone-400 animate-fade-in">
      <div className="size-20 rounded-full bg-primary-light flex items-center justify-center mb-4">
        <ChefHat size={36} className="text-primary/60" />
      </div>
      <p className="text-sm text-stone-500 max-w-xs text-center">{message}</p>
      {action && (
        <button
          onClick={action.onClick}
          className="mt-4 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors cursor-pointer"
        >
          {action.label}
        </button>
      )}
    </div>
  )
}

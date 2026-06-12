import { ClipboardList } from 'lucide-react'

interface EmptyStateProps {
  message?: string
}

export default function EmptyState({ message = 'Nenhum item encontrado' }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-stone-400">
      <ClipboardList size={48} />
      <p className="mt-3 text-sm">{message}</p>
    </div>
  )
}

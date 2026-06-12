import { X } from 'lucide-react'
import { useToastStore } from '../../stores/useToastStore'
import type { Toast } from '../../stores/useToastStore'

const styles: Record<Toast['type'], string> = {
  success: 'bg-lime-600 text-white',
  error: 'bg-red-600 text-white',
  info: 'bg-stone-800 text-white',
}

export default function ToastContainer() {
  const { toasts, removeToast } = useToastStore()

  if (toasts.length === 0) return null

  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg text-sm font-medium animate-slide-up ${styles[toast.type]}`}
        >
          <span>{toast.message}</span>
          <button onClick={() => removeToast(toast.id)} className="opacity-70 hover:opacity-100 cursor-pointer">
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  )
}

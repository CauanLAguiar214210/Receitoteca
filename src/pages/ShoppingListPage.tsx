import { Trash2, CheckCircle, Circle } from 'lucide-react'
import { useShoppingStore } from '../stores/useShoppingStore'
import Button from '../components/ui/Button'
import EmptyState from '../components/ui/EmptyState'
import Modal from '../components/ui/Modal'
import { useState } from 'react'

export default function ShoppingListPage() {
  const { items, toggleItem, removeItem, clearAll } = useShoppingStore()
  const [showClearModal, setShowClearModal] = useState(false)

  const unchecked = items.filter((i) => !i.checked).length

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-stone-800">Lista de Compras</h1>
          <p className="text-sm text-stone-500">
            {items.length} item{items.length !== 1 ? 'ns' : ''}
            {unchecked > 0 && ` (${unchecked} pendente${unchecked !== 1 ? 's' : ''})`}
          </p>
        </div>

        {items.length > 0 && (
          <Button variant="danger" onClick={() => setShowClearModal(true)}>
            Limpar Lista
          </Button>
        )}
      </div>

      {items.length === 0 ? (
        <EmptyState message="Nenhum item na lista. Adicione ingredientes de uma receita!" />
      ) : (
        <div className="space-y-1">
          {items.map((item, i) => (
            <div
              key={i}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer hover:bg-stone-100 transition ${
                item.checked ? 'opacity-50' : ''
              }`}
              onClick={() => toggleItem(i)}
            >
              {item.checked ? (
                <CheckCircle size={20} className="text-lime-600 shrink-0" />
              ) : (
                <Circle size={20} className="text-stone-300 shrink-0" />
              )}

              <div className="flex-1 min-w-0">
                <span className={`text-sm ${item.checked ? 'line-through text-stone-400' : 'text-stone-700'}`}>
                  {item.ingredient}
                </span>
                <span className="text-xs text-stone-400 ml-2">({item.recipeTitle})</span>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation()
                  removeItem(i)
                }}
                className="text-stone-400 hover:text-red-600 cursor-pointer"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      )}

      <Modal
        open={showClearModal}
        onClose={() => setShowClearModal(false)}
        title="Limpar Lista"
      >
        <p className="text-stone-600 mb-4">Tem certeza que deseja limpar todos os itens da lista?</p>
        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={() => setShowClearModal(false)}>Cancelar</Button>
          <Button
            variant="danger"
            onClick={() => {
              clearAll()
              setShowClearModal(false)
            }}
          >
            Limpar
          </Button>
        </div>
      </Modal>
    </div>
  )
}

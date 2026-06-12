export default function RecipeCardSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden animate-pulse">
      <div className="h-40 bg-stone-200" />
      <div className="p-4 space-y-3">
        <div className="h-5 bg-stone-200 rounded w-3/4" />
        <div className="flex gap-3">
          <div className="h-3 bg-stone-200 rounded w-16" />
          <div className="h-3 bg-stone-200 rounded w-20" />
          <div className="h-3 bg-stone-200 rounded w-12" />
        </div>
      </div>
    </div>
  )
}

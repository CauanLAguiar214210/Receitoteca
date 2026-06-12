export default function RecipeCardSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-border overflow-hidden">
      <div className="h-40 bg-gradient-to-r from-stone-100 via-stone-200 to-stone-100 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite]" />
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

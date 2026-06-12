interface Props {
  size?: 'sm' | 'md' | 'lg'
}

const sizes = {
  sm: 'size-5 border-2',
  md: 'size-8 border-[3px]',
  lg: 'size-12 border-4',
}

export default function LoadingSpinner({ size = 'md' }: Props) {
  return (
    <div className="flex items-center justify-center py-12">
      <div className={`${sizes[size]} border-primary/30 border-t-primary rounded-full animate-spin`} />
    </div>
  )
}

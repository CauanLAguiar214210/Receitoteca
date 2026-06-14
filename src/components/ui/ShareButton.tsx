import { useState } from 'react'
import { Share2, Check } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface ShareButtonProps {
  url?: string
  title?: string
}

export default function ShareButton({ url, title }: ShareButtonProps) {
  const { t } = useTranslation()
  const [copied, setCopied] = useState(false)

  const handleShare = async () => {
    const link = url || window.location.href

    if (navigator.share) {
      await navigator.share({ title: title || t('share.title'), url: link })
      return
    }

    await navigator.clipboard.writeText(link)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleShare}
      className="flex items-center gap-1.5 text-sm text-stone-500 hover:text-primary transition-colors cursor-pointer"
    >
      {copied ? <Check size={18} className="text-primary" /> : <Share2 size={18} />}
      {copied ? t('share.copied') : t('share.button')}
    </button>
  )
}

import { useTranslation } from 'react-i18next'

export default function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const current = i18n.language?.startsWith('pt') ? 'pt-BR' : 'en-US'

  const toggle = () => {
    const next = current === 'pt-BR' ? 'en-US' : 'pt-BR'
    i18n.changeLanguage(next)
  }

  return (
    <button
      onClick={toggle}
      className="text-xs font-bold uppercase tracking-widest px-2 py-1 rounded-md border border-border text-stone-400 hover:text-primary hover:border-primary transition-colors cursor-pointer shrink-0"
      title={current === 'pt-BR' ? 'Switch to English' : 'Mudar para Português'}
    >
      {current === 'pt-BR' ? 'EN' : 'PT'}
    </button>
  )
}

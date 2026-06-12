import { useState, useRef } from 'react'
import { Upload, X } from 'lucide-react'
import { supabase } from '../../lib/supabaseClient'

interface ImageUploadProps {
  onUpload: (url: string) => void
  currentImage?: string | null
}

export default function ImageUpload({ onUpload, currentImage }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(currentImage ?? null)
  const [uploading, setUploading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    const localPreview = URL.createObjectURL(file)
    setPreview(localPreview)

    const filePath = `${crypto.randomUUID()}-${file.name}`
    const { data, error } = await supabase.storage
      .from('recipe-images')
      .upload(filePath, file)

    if (error) {
      console.error(error)
      setUploading(false)
      return
    }

    const { data: { publicUrl } } = supabase.storage
      .from('recipe-images')
      .getPublicUrl(data.path)

    onUpload(publicUrl)
    setUploading(false)
  }

  const handleRemove = () => {
    setPreview(null)
    onUpload('')
    if (inputRef.current) inputRef.current.value = ''
  }

  return (
    <div>
      <label className="block text-sm font-medium text-stone-700 mb-1">Foto da Receita</label>

      {preview ? (
        <div className="relative w-full h-48 rounded-lg overflow-hidden bg-stone-100">
          <img src={preview} alt="" className="size-full object-cover" />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 bg-white/80 rounded-full p-1 hover:bg-white cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="w-full h-48 border-2 border-dashed border-stone-300 rounded-lg flex flex-col items-center justify-center text-stone-400 hover:border-lime-500 hover:text-lime-600 transition cursor-pointer"
        >
          <Upload size={28} />
          <span className="mt-2 text-sm">{uploading ? 'Enviando...' : 'Clique para enviar foto'}</span>
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFile}
        className="hidden"
      />
    </div>
  )
}

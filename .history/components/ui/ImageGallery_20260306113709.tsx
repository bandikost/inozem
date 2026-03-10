import ImageWithSkeleton from "@/components/ui/ImageWithSkeleton"

interface Props {
  images: string[]
  cols?: string
}

export default function ImageGallery({ images, cols = "grid-cols-4" }: Props) {
  return (
    <div className={`grid ${cols} gap-6 mt-10 items-center justify-center mb-6`}>
      {images.map((src, i) => (
        <ImageWithSkeleton
          key={i}
          src={src}
          alt="Изображение академии"
          wrapperClassName="max-w-[320px] max-h-[320px] !border-2 border-prpl shadow-xl"
          aspect="1/1"
        />
      ))}
    </div>
  )
}
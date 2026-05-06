import ImageWithSkeleton from "./ImageWithSkeleton"
import VideoPreview from "./VideoPreview"

interface Media {
  type: "image" | "video"
  src: string
  preview?: string
  subtitle?: string
}

interface Props {
  items: Media[]
  cols?: string
  subtitle: string
}

export default function MediaGallery({ subtitle, items, cols = "" }: Props) {
  return (
    <div className={`grid ${cols} gap-6 mt-10 items-center justify-center mb-6`}>
      {items.map((item, i) => {
        if (item.type === "image") {
          return (
            <ImageWithSkeleton
              key={`${item.src}-${i}`}
              src={item.src}
              alt="Изображение академии"
              wrapperClassName="max-w-[320px] max-h-[320px] border-2 border-prpl shadow-xl grid items-center justify-center "
              aspect="1/1"
            />
          )
        }

        return <VideoPreview key={`${item.src}-${i}`} src={item.src} preview={item.preview!} subtitle={item.subtitle}/>
        
      })}
    </div>
  )
}
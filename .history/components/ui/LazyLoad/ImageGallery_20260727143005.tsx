import ImageWithSkeleton from "./ImageWithSkeleton"
import VideoPreview from "./VideoPreview"

interface Media {
  type: "image" | "video"
  src: string
  preview?: string
  subtitles?: string[]
}

interface Props {
  items: Media[]
  cols?: string
}

export default function MediaGallery({ items, cols = "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" }: Props) {
  return (
    <div className={`grid ${cols} gap-5`}>
      {(items || []).map((item, i) => {
        if (item.type === "image") {
          return (
            <div key={`${item.src}-${i}`} className="overflow-hidden rounded-2xl bg-white shadow-[0_10px_30px_rgba(15,23,42,0.08)] ring-1 ring-slate-200 transition-transform hover:-translate-y-1">
              <ImageWithSkeleton
                src={item.src}
                alt="Изображение академии"
                wrapperClassName="w-full"
                aspect="1/1"
              />
            </div>
          )
        }

        return (
          <div key={`${item.src}-${i}`} className="overflow-hidden rounded-2xl bg-white shadow-[0_10px_30px_rgba(15,23,42,0.08)] ring-1 ring-slate-200 transition-transform hover:-translate-y-1">
            <VideoPreview src={item.src} preview={item.preview} subtitles={item.subtitles} />
          </div>
        )
      })}
    </div>
  )
}
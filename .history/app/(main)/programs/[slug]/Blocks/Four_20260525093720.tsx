import MediaGallery from "@/components/ui/LazyLoad/ImageGallery";

type VideoItem = {
  type: "video";
  src: string;
  preview: string;
  subtitles: string[];
};

interface Props {
  sources?: VideoItem[];
}

export default function Four({
  sources = [],
}: Props) {

  if (!sources.length) {
    return null;
  }

  return (
    <section className="relative">

      <div className="border border-gray-300 rounded-md shadow-2xl p-6">
        <MediaGallery
          cols="lg:grid-cols-2 grid-cols-1 xs:grid-cols-2 md:grid-cols-2"
          items={sources}
        />
      </div>

    </section>
  )
}
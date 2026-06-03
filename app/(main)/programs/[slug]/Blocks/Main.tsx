import MediaGallery from "@/components/ui/LazyLoad/ImageGallery"

type LinkGroup = {
  title: string
  items: {
    name: string
    href: string
  }[]
}

type VideoItem = {
  type: "video"
  src: string
  preview: string
  subtitles: string[]
}

type VideoGroup = {
  title: string
  headlineId: string
  items: VideoItem[]
}

interface Props {
  sources?: VideoGroup[]
  links?: LinkGroup[]
}

function normalizeSources(
  sources: VideoItem[] | VideoGroup[] = []
): VideoGroup[] {

  if (!sources.length) {
    return [];
  }

  const first = sources[0] as any;

  
  if (first.items) {
    return sources as VideoGroup[];
  }

  return [
    {
      title: "",
      headlineId: "",
      items: sources as VideoItem[],
    },
  ];
}


export default function Main({
  sources = [],
  links = [],
}: Props) {

  const normalizedSources = normalizeSources(sources)
  const hasVideos = sources.length > 0
  const hasLinks = links.length > 0

  if (!hasVideos && !hasLinks) {
    return null
  }

  return (
    <section className="relative">

      <div className="border border-gray-300 rounded-md shadow-2xl p-6 flex flex-col gap-8">

        {hasLinks && links.map((group, i) => (
          <div key={i}>
            {group.title?.trim() && ( <h2 className="text-prpl text-xl md:!text-3xl mb-4 text-center">{group.title}
              <hr className="border border-gray-200 mt-4 mb-8" />
            </h2> )}  
            
            <ul className="flex flex-col gap-3">
              {group.items.map((link) => (
                <li key={link.href}>
                  <a  href={link.href}  target="_blank" className="hover:underline text-lg md:text-xl">{link.name}</a>
                </li>

              ))}
            </ul>

          </div>
        ))}


        {hasVideos && ( 
          <div className="mt-8">
            
            
            {normalizedSources.map((group, i) => (
            <div key={i}>
              {group.title && (
                <>
               
                <h2 className="text-prpl mt-12  mb-8 text-center text-xl md:!text-3xl">
                  {group.title}
                </h2>
                <hr className="border border-gray-200 mt-4 mb-8" />

                 </>
              )}

              <MediaGallery cols="lg:grid-cols-3 grid-cols-1 xs:grid-cols-2 md:grid-cols-2" items={group.items} />
            </div>
          ))} 
          </div>
          )}

      </div>

    </section>
  )
}
import MediaGallery from "@/components/ui/LazyLoad/ImageGallery";

type VideoItem = {
  type: "video";
  src: string;
  preview: string;
  subtitles: string[];
};

type LinkGroup = {
  title: string;
  items: {
    name: string;
    href: string;
  }[];
};

interface Props {
  sources?: VideoItem[];
  links?: LinkGroup[];
}

export default function Four({
  sources = [],
  links = [],
}: Props) {

  const hasVideos = sources.length > 0;
  const hasLinks = links.length > 0;

  if (!hasVideos && !hasLinks) {
    return null;
  }

  return (
    <section className="relative">

      <div className="border border-gray-300 rounded-md shadow-2xl p-6 flex flex-col gap-8">

        {/* LINKS */}

        {hasLinks && links.map((group, i) => (

          <div key={i}>

            <h2 className="text-prpl text-xl mb-4">
              {group.title}
            </h2>

            <ul className="flex flex-col gap-2">

              {group.items.map((link) => (

                <li key={link.href}>

                  <a
                    href={link.href}
                    target="_blank"
                    className="hover:underline"
                  >
                    {link.name}
                  </a>

                </li>

              ))}

            </ul>

          </div>

        ))}

        {/* VIDEOS */}

        {hasVideos && (
          <MediaGallery
            cols="lg:grid-cols-2 grid-cols-1 xs:grid-cols-2 md:grid-cols-2"
            items={sources}
          />
        )}

      </div>

    </section>
  );
}
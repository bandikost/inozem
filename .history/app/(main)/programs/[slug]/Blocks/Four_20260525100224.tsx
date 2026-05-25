import MediaGallery from "@/components/ui/LazyLoad/ImageGallery";

type VideoItem = {
  type: "video";
  src: string;
  preview: string;
  subtitles: string[];
};

type LinkItem = {
  type: "links";
  title: string;
  items: {
    name: string;
    href: string;
  }[];
};

type SourceItem =
  | VideoItem
  | LinkItem;

interface Props {
  sources?: SourceItem[];
}

export default function Four({
  sources = [],
}: Props) {

  if (!sources.length) {
    return null;
  }

  const links = sources.filter(
    (s) => s.type === "links"
  ) as LinkItem[];

  const videos = sources.filter(
    (s) => s.type === "video"
  ) as VideoItem[];

  return (
    <section className="relative">

      <div className="border border-gray-300 rounded-md shadow-2xl p-6 flex flex-col gap-8">

        {/* LINKS FIRST */}

        {links.map((group, i) => (

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

        {!!videos.length && (
          <MediaGallery
            cols="lg:grid-cols-2 grid-cols-1 xs:grid-cols-2 md:grid-cols-2"
            items={videos}
          />
        )}

      </div>

    </section>
  );
}
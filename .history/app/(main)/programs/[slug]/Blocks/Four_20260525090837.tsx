interface SourceItem {
  key: string;
  headlineId: string;
}

interface Props {
  headlines?: string[];
  sources?: SourceItem[];
}

export default function Four({
  headlines = [],
  sources = [],
}: Props) {

  return (
    <div className="flex flex-col gap-6">

      {sources.map((src, i) => (

        <div
          key={i}
          className="border rounded-md p-4"
        >

          <h3 className="font-semibold text-lg">
            {src.headlineId}
          </h3>

          <p>
            Resource key:
            {" "}
            {src.key}
          </p>

        </div>

      ))}

    </div>
  );
}
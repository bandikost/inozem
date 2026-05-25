"use client";

type VideoItem = {
  type: "video";
  src: string;
  preview: string;
  subtitles: string[];
};

type SourcesEditorProps = {
  sources: VideoItem[];
  onChange: (sources: VideoItem[]) => void;
};

export default function SourcesEditor({
  sources,
  onChange,
}: SourcesEditorProps) {

  const addVideo = () => {

    onChange([
      ...sources,
      {
        type: "video",
        src: "",
        preview: "/Images/заглушка.png",
        subtitles: [""],
      },
    ]);

  };

  const updateVideo = (
    index: number,
    field: keyof VideoItem,
    value: any
  ) => {

    const copy = [...sources];

    copy[index] = {
      ...copy[index],
      [field]: value,
    };

    onChange(copy);

  };

  const updateSubtitle = (
    videoIndex: number,
    subtitleIndex: number,
    value: string
  ) => {

    const copy = [...sources];

    copy[videoIndex].subtitles[subtitleIndex] = value;

    onChange(copy);

  }

  const removeVideo = (index: number) => {

    onChange(
      sources.filter((_, i) => i !== index)
    );

  };

  return (
    <div className="mt-6 border rounded-md p-4">

      <h3 className="font-semibold text-lg mb-4">
        Видео
      </h3>

      <div className="flex flex-col gap-6">

        {sources.map((video, index) => (

          <div key={index} className="border rounded-md p-4 flex flex-col gap-4">


            <input type="text" placeholder="Ссылка на видео" value={video.src}  onChange={(e) => updateVideo(index, "src", e.target.value)}
              className="border border-gray-400 p-2 rounded-md text-lg !text-blue-600" />


            <div className="flex flex-col gap-2">

              {video.subtitles.map((subtitle, subtitleIndex) => (

                <input
                  key={subtitleIndex}
                  type="text"
                  placeholder="Название видео"
                  value={subtitle}
                  onChange={(e) =>
                    updateSubtitle(
                      index,
                      subtitleIndex,
                      e.target.value
                    )
                  }
                  className="border border-gray-400 p-2 rounded-md text-lg !text-default"
                />

              ))}

            </div>

            <button
              onClick={() => removeVideo(index)}
              className="bg-red-400 p-2 rounded-md hover:opacity-80 cursor-pointer"
            >
              Удалить видео
            </button>

          </div>

        ))}

      </div>

      <button onClick={addVideo} className="mt-6 button-more">+ Добавить видео</button>

    </div>
  );
}
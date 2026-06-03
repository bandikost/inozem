"use client";

type VideoItem = {
  type: "video";
  src: string;
  preview: string;
  subtitles: string[];
};

type VideoGroup = {
  headlineId: string;
  title: string;
  items: VideoItem[];
};

type SourcesEditorProps = {
  sources: VideoGroup[];
  onChange: (sources: VideoGroup[]) => void;
};

export default function SourcesEditor({
  sources,
  onChange,
}: SourcesEditorProps) {

  const addGroup = () => {
    onChange([
      ...sources,
      {
        title: "",
        headlineId: "",
        items: [],
      },
    ]);
  };

  const updateGroup = (
    groupIndex: number,
    field: keyof VideoGroup,
    value: string
  ) => {
    const copy = [...sources];

    copy[groupIndex] = {
      ...copy[groupIndex],
      [field]: value,
    };

    onChange(copy);
  };

  const removeGroup = (groupIndex: number) => {
    onChange(
      sources.filter((_, i) => i !== groupIndex)
    );
  };

  const addVideo = (groupIndex: number) => {
    const copy = [...sources];

    copy[groupIndex].items.push({
      type: "video",
      src: "",
      preview: "/Images/заглушка.png",
      subtitles: [""],
    });

    onChange(copy);
  };

  const updateVideo = (
    groupIndex: number,
    videoIndex: number,
    field: keyof VideoItem,
    value: any
  ) => {
    const copy = [...sources];

    copy[groupIndex].items[videoIndex] = {
      ...copy[groupIndex].items[videoIndex],
      [field]: value,
    };

    onChange(copy);
  };

  const updateSubtitle = (
    groupIndex: number,
    videoIndex: number,
    subtitleIndex: number,
    value: string
  ) => {
    const copy = [...sources];

    copy[groupIndex].items[videoIndex].subtitles[subtitleIndex] =
      value;

    onChange(copy);
  };

  const removeVideo = (
    groupIndex: number,
    videoIndex: number
  ) => {
    const copy = [...sources];

    copy[groupIndex].items =
      copy[groupIndex].items.filter(
        (_, i) => i !== videoIndex
      );

    onChange(copy);
  };

  return (
    <div className="p-4">

      <h3 className="font-semibold text-lg mb-4">
        Видео
      </h3>

      <div className="flex flex-col gap-6">

        {sources.map((group, groupIndex) => (

          <div
            key={groupIndex}
            className="border border-gray-400 rounded-md p-6"
          >

            <input
              type="text"
              placeholder="Название группы"
              value={group.title}
              onChange={(e) =>
                updateGroup(
                  groupIndex,
                  "title",
                  e.target.value
                )
              }
              className="border border-gray-400 p-2 rounded-md w-full text-lg !text-default"
            />

            <div className="mt-6 flex flex-col gap-6">

              {(group.items || []).map((video, videoIndex) => (

                <div
                  key={videoIndex}
                  className="border border-gray-300 rounded-md p-4 flex flex-col gap-4"
                >

                  {video.subtitles.map(
                    (subtitle, subtitleIndex) => (

                      <input
                        key={subtitleIndex}
                        type="text"
                        placeholder="Название видео"
                        value={subtitle}
                        onChange={(e) =>
                          updateSubtitle(
                            groupIndex,
                            videoIndex,
                            subtitleIndex,
                            e.target.value
                          )
                        }
                        className="border border-gray-400 p-2 rounded-md text-lg !text-default"
                      />

                    )
                  )}

                  <input
                    type="text"
                    placeholder="Ссылка на видео"
                    value={video.src}
                    onChange={(e) =>
                      updateVideo(
                        groupIndex,
                        videoIndex,
                        "src",
                        e.target.value
                      )
                    }
                    className="border border-gray-400 p-2 rounded-md text-lg !text-blue-600"
                  />

                  <button
                    onClick={() =>
                      removeVideo(
                        groupIndex,
                        videoIndex
                      )
                    }
                    className="border px-3 py-2 rounded-md button-more"
                  >
                    Удалить видео
                  </button>

                </div>

              ))}

            </div>

            <button
              onClick={() => addVideo(groupIndex)}
              className="mt-4 border px-3 py-2 rounded-md button-more"
            >
              + Добавить видео
            </button>

            <button
              onClick={() => removeGroup(groupIndex)}
              className="mt-4 ml-4 border px-3 py-2 rounded-md button-more"
            >
              Удалить группу
            </button>

          </div>

        ))}

      </div>

      <button
        onClick={addGroup}
        className="mt-6 border px-4 py-2 rounded-md button-more"
      >
        + Добавить группу
      </button>

    </div>
  );
}
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
    <div className="mt-8 rounded-2xl border border-gray-200 bg-gray-50/50 p-5">

      {/* HEADER */}

      <div className="mb-6 flex items-center justify-between gap-4">

        <div>

          <h3 className="text-lg font-semibold text-gray-900">
            Видео
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            Добавьте видеоматериалы и объедините их по тематическим группам
          </p>

        </div>

        <span className="rounded-full bg-white px-3 py-1.5 text-xs font-medium text-gray-500 ring-1 ring-gray-200">
          {sources.length}{" "}
          {sources.length === 1
            ? "группа"
            : "групп"}
        </span>

      </div>


      {/* GROUPS */}

      <div className="flex flex-col gap-5">

        {sources.length === 0 && (

          <div className="rounded-xl border border-dashed border-gray-300 bg-white px-6 py-10 text-center">

            <p className="font-medium text-gray-600">
              Групп видео пока нет
            </p>

            <p className="mt-1 text-sm text-gray-400">
              Добавьте первую группу видеоматериалов
            </p>

          </div>

        )}


        {sources.map((group, groupIndex) => (

          <div
            key={groupIndex}
            className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
          >

            {/* GROUP HEADER */}

            <div className="flex items-center justify-between gap-4 border-b border-gray-100 bg-white px-5 py-4">

              <div className="flex items-center gap-3">

                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-sm font-semibold text-blue">
                  {String(groupIndex + 1).padStart(2, "0")}
                </div>

                <div>

                  <p className="text-sm font-semibold text-gray-900">
                    Группа видео {groupIndex + 1}
                  </p>

                  <p className="mt-0.5 text-xs text-gray-400">
                    {group.items?.length ?? 0}{" "}
                      {(group.items?.length ?? 0) === 1
                        ? "видео"
                        : "видео"}
                  </p>

                </div>

              </div>


              <button
                type="button"
                onClick={() =>
                  removeGroup(groupIndex)
                }
                className="cursor-pointer rounded-lg px-3 py-2 text-sm text-red-500 transition hover:bg-red-50 hover:opacity-80"
              >
                Удалить группу
              </button>

            </div>


            {/* GROUP CONTENT */}

            <div className="p-5">

              <div className="mb-5">

                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Название группы
                </label>

                <input
                  type="text"
                  placeholder="Например: Лекции по теме"
                  value={group.title}
                  onChange={(e) =>
                    updateGroup(
                      groupIndex,
                      "title",
                      e.target.value
                    )
                  }
                  className="input-main"
                />

              </div>


              {/* VIDEOS */}

              <div className="flex flex-col gap-3">

                {(group.items || []).map(
                  (video, videoIndex) => (

                    <div
                      key={videoIndex}
                      className="rounded-xl border border-gray-200 bg-gray-50/70 p-4"
                    >

                      <div className="mb-4 flex items-center justify-between">

                        <span className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                          Видео {videoIndex + 1}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            removeVideo(
                              groupIndex,
                              videoIndex
                            )
                          }
                          className="cursor-pointer text-xs font-medium text-red-500 transition hover:text-red-700 hover:opacity-80"
                        >
                          Удалить
                        </button>

                      </div>


                      {/* VIDEO TITLES */}

                      <div className="flex flex-col gap-3">

                        {video.subtitles.map(
                          (
                            subtitle,
                            subtitleIndex
                          ) => (

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
                              className="input-main"
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
                          className="input-main text-blue-600"
                        />

                      </div>

                    </div>

                  )
                )}

              </div>


              {/* ADD VIDEO */}

              <button
                type="button"
                onClick={() =>
                  addVideo(groupIndex)
                }
                className="mt-4 inline-flex cursor-pointer items-center rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-600 shadow-sm transition hover:border-blue hover:text-blue hover:opacity-80"
              >
                + Добавить видео
              </button>

            </div>

          </div>

        ))}

      </div>


      {/* ADD GROUP */}

      <button
        type="button"
        onClick={addGroup}
        className="mt-6 inline-flex cursor-pointer items-center rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-blue hover:text-blue hover:opacity-80"
      >
        + Добавить группу видео
      </button>


      <style jsx>{`

        .input-main {
          width: 100%;
          border: 1px solid rgb(229 231 235);
          border-radius: 0.75rem;
          background: white;
          padding: 0.75rem 0.875rem;
          font-size: 0.9rem;
          color: rgb(17 24 39);
          outline: none;
          transition: all 0.2s ease;
        }

        .input-main::placeholder {
          color: rgb(156 163 175);
        }

        .input-main:focus {
          border-color: rgb(37 99 235);
          box-shadow: 0 0 0 3px rgb(37 99 235 / 0.1);
        }

      `}</style>

    </div>
  );
}
"use client";

import { useState, useEffect } from "react";

type VideoItem = {
  type: "video";
  src: string;
  preview: string;
  subtitles: string[];
};

type VideoGroup = {
  title: string;
  items: VideoItem[];
};

type Props = {
  sources: VideoGroup[];
  onChange: (sources: VideoGroup[]) => void;
};

export default function SourcesEditor({ sources, onChange }: Props) {
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  const toggleGroup = (index: number) => {
    setCollapsed((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  useEffect(() => {
    const saved = localStorage.getItem("sources-collapsed");
    if (saved) setCollapsed(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("sources-collapsed", JSON.stringify(collapsed));
  }, [collapsed]);

  const addGroup = () => {
    onChange([
      ...sources,
      {
        title: "",
        items: [],
      },
    ]);
  };

  const updateGroup = (index: number, value: Partial<VideoGroup>) => {
    const copy = [...sources];
    copy[index] = {
      ...copy[index],
      ...value,
    };
    onChange(copy);
  };

  const removeGroup = (index: number) => {
    onChange(sources.filter((_, i) => i !== index));
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
    (copy[groupIndex].items[videoIndex] as any)[field] = value;
    onChange(copy);
  };

  const updateSubtitle = (
    groupIndex: number,
    videoIndex: number,
    subtitleIndex: number,
    value: string
  ) => {
    const copy = [...sources];
    copy[groupIndex].items[videoIndex].subtitles[subtitleIndex] = value;
    onChange(copy);
  };

  const removeVideo = (groupIndex: number, videoIndex: number) => {
    const copy = [...sources];
    copy[groupIndex].items = copy[groupIndex].items.filter(
      (_, i) => i !== videoIndex
    );
    onChange(copy);
  };

  return (
    <div className="p-4">
      <h3 className="font-semibold text-lg mb-4">Видео</h3>

      <div className="flex flex-col gap-6">
        {sources.map((group, groupIndex) => (
          <div key={groupIndex} className="border p-4 rounded-md">
            
            <div className="flex justify-between mb-2">
              <input
                value={group.title}
                onChange={(e) =>
                  updateGroup(groupIndex, { title: e.target.value })
                }
                placeholder="Название группы"
                className="border p-2 rounded-md w-full"
              />

              <button
                onClick={() => toggleGroup(groupIndex)}
                className="button-more ml-2"
              >
                {collapsed[groupIndex] ? "Развернуть" : "Свернуть"}
              </button>
            </div>

            {!collapsed[groupIndex] && (
              <>
                {group.items.map((video, videoIndex) => (
                  <div
                    key={videoIndex}
                    className="border mt-3 p-3 rounded-md"
                  >
                    <input
                      value={video.src}
                      onChange={(e) =>
                        updateVideo(
                          groupIndex,
                          videoIndex,
                          "src",
                          e.target.value
                        )
                      }
                      placeholder="Video URL"
                      className="border p-2 rounded-md w-full"
                    />

                    {video.subtitles.map((s, si) => (
                      <input
                        key={si}
                        value={s}
                        onChange={(e) =>
                          updateSubtitle(
                            groupIndex,
                            videoIndex,
                            si,
                            e.target.value
                          )
                        }
                        placeholder="Subtitle"
                        className="border p-2 rounded-md w-full mt-2"
                      />
                    ))}

                    <button
                      onClick={() =>
                        removeVideo(groupIndex, videoIndex)
                      }
                      className="bg-red-400 p-2 mt-2 rounded-md"
                    >
                      Удалить видео
                    </button>
                  </div>
                ))}

                <button
                  onClick={() => addVideo(groupIndex)}
                  className="button-more mt-3"
                >
                  + Добавить видео
                </button>
              </>
            )}

            <button
              onClick={() => removeGroup(groupIndex)}
              className="bg-red-400 p-2 mt-3 rounded-md"
            >
              Удалить группу
            </button>
          </div>
        ))}
      </div>

      <button onClick={addGroup} className="button-more mt-6">
        + Добавить группу
      </button>
    </div>
  );
}
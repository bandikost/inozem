"use client";

import HeadlineList from "./HeadlineList";
import SourcesEditor from "./SourcesEditor";
import LinksEditor from "./LinksEditor";

type BlockType = "video" | "main" | "second" | "third" | "four";

type Block = {
  title: string;
  type: BlockType;

  data: {
    headlines: string[];
    sources: any[];
    links: any[];
  };
};

export default function BlockEditor({
  block,
  onChange,
}: {
  block: Block;
  onChange: (b: Block) => void;
}) {

  const update = (field: keyof Block, value: any) => {
    onChange({ ...block, [field]: value });
  };

const updateData = (field: keyof Block["data"], value: any) => {
  onChange({
    ...block,
    data: {
      ...block.data,
      [field]: value,
    },
  });
};

  const hasContent = block.type === "main" || block.type === "four";

  return (
    <div className="border p-4 m-2">

      <input
        value={block.title}
        onChange={(e) => update("title", e.target.value)}
        placeholder="Заголовок"
        className="border border-gray-400 p-2 mb-2 mr-2 rounded-md"
      />

      <select
        value={block.type}
        onChange={(e) => update("type", e.target.value)}
        className="border border-gray-300 p-2 rounded-md"
      >
        <option value="four" >Основной для видео + ссылки</option>
        <option value="main">Текст + ссылки</option>
      </select>

      {hasContent && (
        <>
          <HeadlineList
            headlines={block.data.headlines}
            onChange={(h) => updateData("headlines", h)}
          />

          <SourcesEditor
            sources={block.data.sources}
            onChange={(s) => updateData("sources", s)}
          />

          <LinksEditor
            links={block.data.links}
            onChange={(l) => updateData("links", l)}
          />
        </>
      )}

    </div>
  );
}
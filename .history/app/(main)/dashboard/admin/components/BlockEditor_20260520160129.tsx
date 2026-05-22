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
        headlines: [],
        sources: [],
        links: [],
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
        placeholder="title"
      />

      <select
        value={block.type}
        onChange={(e) => update("type", e.target.value)}
      >
        <option value="video">video</option>
        <option value="main">main</option>
        <option value="second">second</option>
        <option value="third">third</option>
        <option value="four">four</option>
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
"use client";

import HeadlineList from "./HeadlineList";

type BlockType = "video" | "main" | "second" | "third" | "four";

type Block = {
  title: string;
  type: BlockType;
  headlines: string[];
};

type BlockEditorProps = {
  block: Block;
  onChange: (value: Block) => void;
};

export default function BlockEditor({
  block,
  onChange,
}: BlockEditorProps) {
  const update = <K extends keyof Block>(
    field: K,
    value: Block[K]
  ) => {
    onChange({ ...block, [field]: value });
  };

  return (
    <div style={{ border: "1px solid #ccc", margin: 10, padding: 10 }}>
      <input
        placeholder="Block title"
        value={block.title}
        onChange={(e) => update("title", e.target.value)}
      />

      <select
        value={block.type}
        onChange={(e) => update("type", e.target.value as BlockType)}
      >
        <option value="video">video</option>
        <option value="main">main</option>
        <option value="second">second</option>
        <option value="third">third</option>
        <option value="four">four</option>
      </select>

      {block.type === "main" && (
        <HeadlineList
          headlines={block.headlines}
          onChange={(h) => update("headlines", h)}
        />
      )}
    </div>
  );
}
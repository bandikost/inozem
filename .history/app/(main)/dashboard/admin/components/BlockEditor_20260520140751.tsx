"use client";

import HeadlineList from "./HeadlineList";
import SourcesEditor from "./SourcesEditor";

type BlockType = "video" | "main" | "second" | "third" | "four";

type Block = {
  title: string;
  type: BlockType;

  data?: {
    headlines?: string[];

    sources?: {
      key: string;
      headlineIndex: number;
    }[];

    links?: {
      headlineIndex: number;
      items: {
        name: string;
        href: string;
      }[];
    }[];
  };
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
    onChange({
      ...block,
      [field]: value,
    });
  };

  const updateData = (
    field: keyof NonNullable<Block["data"]>,
    value: any
  ) => {
    onChange({
      ...block,
      data: {
        ...block.data,
        [field]: value,
      },
    });
  };

  return (
    <div
      style={{
        border: "1px solid #ccc",
        margin: 10,
        padding: 10,
      }}
    >

      {/* TITLE */}

      <input
        placeholder="Block title"
        value={block.title}
        onChange={(e) => update("title", e.target.value)}
      />

      {/* TYPE */}

      <select
        value={block.type}
        onChange={(e) =>
          update("type", e.target.value as BlockType)
        }
      >
        <option value="video">video</option>
        <option value="main">main</option>
        <option value="second">second</option>
        <option value="third">third</option>
        <option value="four">four</option>
      </select>

      {/* HEADLINES */}

      {(block.type === "main" || block.type === "four") && (
        <>
        
        <HeadlineList
          headlines={block.data?.headlines || []}
          onChange={(h) => updateData("headlines", h)}
        />
        <SourcesEditor
        sources={block.data?.sources || []}
        onChange={(s) => updateData("sources", s)}
        />

        </>
      )}
    </div>
  );
}
"use client";

import { useState } from "react";
import BlockEditor from "./BlockEditor";

type BlockType = "video" | "main" | "second" | "third" | "four";

type Block = {
  title: string;
  type: BlockType;

  data: {
    headlines?: string[];

    sources?: {
      key: string;
      headlineId: string;
    }[];

    links?: {
      headlineId: string;
      items: {
        name: string;
        href: string;
      }[];
    }[];
  };
};

type Program = {
  specialization: string;

  name: string;
  slug: string;
  price: number;
  education: string;
  category: string;
  diplom: string;
  time: string;

  blocks: Block[];
};

export default function ProgramEditor() {
  const [program, setProgram] = useState<Program>({
    specialization: "",
    name: "",
    slug: "",
    price: 0,
    education: "",
    category: "",
    diplom: "",
    time: "",
    blocks: [],
  });

 const addBlock = () => {
  setProgram((p) => ({
    ...p,
    blocks: [
      ...p.blocks,
      {
        title: "",
        type: "video",
        data: {
          headlines: [],
          sources: [],
          links: [],
        },
      },
    ],
  }))
}

 const updateBlock = (index: number, value: Block) => {
  const updated = [...program.blocks]
  updated[index] = value

  setProgram((p) => ({
    ...p,
    blocks: updated,
  }))
}

  const save = async () => {
    const res = await fetch("/api/admin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(program),
    });

    const text = await res.text();

    if (!res.ok) {
      console.error("Save failed raw response:", text);
      return;
    }

    console.log("SUCCESS:", text);
    alert("Saved");
  };

  return (
    <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 10 }}>

      {/* BASIC FIELDS */}

      <input
        placeholder="Specialization"
        value={program.specialization}
        onChange={(e) =>
          setProgram({ ...program, specialization: e.target.value })
        }
      />

      <input
        placeholder="Name"
        value={program.name}
        onChange={(e) =>
          setProgram({ ...program, name: e.target.value })
        }
      />

      <input
        placeholder="Slug"
        value={program.slug}
        onChange={(e) =>
          setProgram({ ...program, slug: e.target.value })
        }
      />

      <input
        placeholder="Price"
        type="number"
        value={program.price}
        onChange={(e) =>
          setProgram({ ...program, price: Number(e.target.value) })
        }
      />

      <input
        placeholder="Education"
        value={program.education}
        onChange={(e) =>
          setProgram({ ...program, education: e.target.value })
        }
      />

      <input
        placeholder="Category"
        value={program.category}
        onChange={(e) =>
          setProgram({ ...program, category: e.target.value })
        }
      />

      <input
        placeholder="Diplom"
        value={program.diplom}
        onChange={(e) =>
          setProgram({ ...program, diplom: e.target.value })
        }
      />

      <input
        placeholder="Time"
        value={program.time}
        onChange={(e) =>
          setProgram({ ...program, time: e.target.value })
        }
      />

      {/* BLOCKS */}

      <button onClick={addBlock}>+ Add block</button>

      {program.blocks.map((block, i) => (
        <BlockEditor
          key={i}
          block={block}
          onChange={(val) => updateBlock(i, val)}
        />
      ))}

      {/* SAVE */}

      <button onClick={save}>
        Save program
      </button>
    </div>
  );
}
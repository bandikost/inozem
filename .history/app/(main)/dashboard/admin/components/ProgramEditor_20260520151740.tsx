"use client";

import { useState } from "react";
import BlockEditor from "./BlockEditor";

export type Program = {
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
          },
        },
      ],
    }));
  };

  const updateBlock = (index: number, value: Block) => {
    const copy = [...program.blocks];
    copy[index] = value;

    setProgram((p) => ({
      ...p,
      blocks: copy,
    }));
  };

  const save = async () => {
    await fetch("/api/admin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(program),
    });
  };

  return (
    <div className="flex flex-col gap-3">
      <input
        placeholder="Specialization"
        value={program.specialization}
        onChange={(e) =>
          setProgram({ ...program, specialization: e.target.value })
        }
      />

      <button onClick={addBlock}>+ Add block</button>

      {program.blocks.map((b, i) => (
        <BlockEditor
          key={i}
          block={b}
          onChange={(val) => updateBlock(i, val)}
        />
      ))}

      <button onClick={save}>Save</button>
    </div>
  );
}
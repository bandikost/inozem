"use client";

import { useState } from "react";
import BlockEditor from "./BlockEditor";


type BlockType = "video" | "main" | "second" | "third" | "four";

type Block = {
  title: string;
  type: BlockType;
  headlines: string[];
};

type Program = {
  specialization: string;
  blocks: Block[];
};


export default function ProgramEditor() {
  const [program, setProgram] = useState<Program>({
  specialization: "",
  blocks: [],
})

  const addBlock = () => {
  setProgram((p) => ({
    ...p,
    blocks: [
      ...p.blocks,
      { title: "", type: "video", headlines: [] },
    ],
  }))
}

 const updateBlock = (index: number, value: Block) => {
  const updated = [...program.blocks];
  updated[index] = value;

  setProgram((p) => ({
    ...p,
    blocks: updated,
  }));
};

const save = async () => {
  const res = await fetch("/api/admin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(program),
  });

  const text = await res.text(); // 🔥 ВАЖНО

  if (!res.ok) {
    console.error("Save failed raw response:", text);
    return;
  }

  console.log("SUCCESS:", text);
  alert("Saved");
};

  return (
    <div>
      <input
        placeholder="Specialization"
        value={program.specialization}
        onChange={(e) =>
          setProgram({ ...program, specialization: e.target.value })
        }
      />

      <button onClick={addBlock}>+ Add block</button>

      {program.blocks.map((block, i) => (
        <BlockEditor
          key={i}
          block={block}
          onChange={(val: any) => updateBlock(i, val)}
        />
      ))}

      <button onClick={save}>Save program</button>
    </div>
  );
}
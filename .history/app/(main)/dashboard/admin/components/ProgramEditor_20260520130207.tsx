"use client";

import { useState } from "react";
import axios from "axios";
import BlockEditor from "./BlockEditor";

export default function ProgramEditor() {
  const [program, setProgram] = useState({
    specialization: "",
    blocks: [],
  });

  const addBlock = () => {
    setProgram((p) => ({
      ...p,
      blocks: [
        ...p.blocks,
        { title: "", type: "video", headlines: [] },
      ],
    }));
  };

  const updateBlock = (index: number, value: any) => {
    const updated = [...program.blocks];
    updated[index] = value;
    setProgram({ ...program, blocks: updated });
  };

  const save = async () => {
    await axios.post("/api/programs", program);
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
          onChange={(val) => updateBlock(i, val)}
        />
      ))}

      <button onClick={save}>Save program</button>
    </div>
  );
}
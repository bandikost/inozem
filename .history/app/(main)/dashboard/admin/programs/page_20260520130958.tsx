"use client";

import ProgramEditor from "../components/ProgramEditor";



export default function AdminProgramsPage() {
  return (
    <div style={{ padding: 20 }}>
      <h1 className="mt-27">Programs Admin</h1>
      <ProgramEditor />
    </div>
  );
}
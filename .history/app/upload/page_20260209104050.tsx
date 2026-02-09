"use client";

import { useState } from "react";

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");

  const handleFileChange = (e: any) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setUrl(data.url);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl mb-4">Загрузка изображения в Yandex Storage</h1>
      <input type="file" onChange={handleFileChange} className="mb-4" />
      <button onClick={handleUpload} className="bg-blue-500 text-white px-4 py-2 rounded">
        Загрузить
      </button>

      {url && (
        <div className="mt-4">
          <p>Файл загружен!</p>
          <img src={url} alt="Uploaded" className="max-w-xs mt-2" />
        </div>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("Ошибка сервера:", text);
        return;
      }

      const data = await res.json();
      setUrl(data.url);
    } catch (err) {
      console.error("Ошибка fetch:", err);
    }
  };

  return (
    <div className="p-8 mt-10">
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

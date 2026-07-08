"use client";

import { useEffect, useState } from "react";

const words = [
  "Ультразвуковая диагностика",
  "Сестринское дело",
  "Операционное дело",
  "Медецинский массаж",
  "Рентгенология",
]

type SearchInputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function SearchInput() {
  const [placeholder, setPlaceholder] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];

    let timeout: NodeJS.Timeout;

    if (!isDeleting) {
      if (placeholder.length < currentWord.length) {
        timeout = setTimeout(() => {
          setPlaceholder(currentWord.slice(0, placeholder.length + 1));
        }, 70);
      } else {
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 1200);
      }
    } else {
      if (placeholder.length > 0) {
        timeout = setTimeout(() => {
          setPlaceholder(currentWord.slice(0, placeholder.length - 1));
        }, 40);
      } else {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [placeholder, isDeleting, wordIndex]);

  return (
    <input
      placeholder={`🔍 ${placeholder}|`}
      className="
        w-full
        rounded-2xl
        bg-white
        px-6
        py-4
        text-lg
        shadow-lg
        outline-none
        focus:ring-4
        focus:ring-white/40
      "
    />
  );
}
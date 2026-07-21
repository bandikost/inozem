"use client";

import { useState } from "react";

export default function AccessibilityButton() {
  const [isLarge, setIsLarge] = useState(false);

  const toggleAccessibility = () => {
    const nextValue = !isLarge;

    setIsLarge(nextValue);

    document.documentElement.classList.toggle(
      "accessibility-large",
      nextValue
    );
  };

  return (
    <button
      type="button"
      onClick={toggleAccessibility}
      className="cursor-pointer rounded-xl border px-4 py-3 transition hover:opacity-70"
    >
      {isLarge
        ? "Обычная версия сайта"
        : "Версия для слабовидящих"}
    </button>
  );
}
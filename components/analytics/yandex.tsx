"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

declare global {
  interface Window {
    ym?: (...args: any[]) => void;
  }
}

export default function YandexMetrika() {
  const pathname = usePathname();

  useEffect(() => {
    if (!window.ym) return;

    window.ym(111451816, "hit", window.location.href);
  }, [pathname]);

  return null;
}
"use client";

import * as Toast from "@radix-ui/react-toast";

export function ToastProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Toast.Provider swipeDirection="right">
      {children}

      <Toast.Viewport
        className="
          fixed
          bottom-0
          right-0
          z-[100]
          m-0
          flex
          w-full
          max-w-[420px]
          flex-col
          gap-3
          p-6
          outline-none
        "
      />
    </Toast.Provider>
  );
}
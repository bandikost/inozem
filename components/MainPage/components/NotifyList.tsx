"use client";

import {
  CalendarDays,
  ChevronRight,
  Loader2,
  Settings2,
} from "lucide-react";
import { useState } from "react";
import { loadNotify } from "./notifyActions";
import type { Notify } from "@/lib/notify";

interface Props {
  initialNotify: Notify[];
  isAdmin: boolean;
  initialHasMore: boolean;
}

export default function NotifyList({
  initialNotify,
  isAdmin,
  initialHasMore,
}: Props) {
  const [activeTab, setActiveTab] = useState<"general" | "staff">(
    "general"
  );

  const [generalNotify, setGeneralNotify] =
    useState<Notify[]>(initialNotify);

  const [staffNotify, setStaffNotify] =
    useState<Notify[]>([]);

  const [generalHasMore, setGeneralHasMore] =
    useState(initialHasMore);

  const [staffHasMore, setStaffHasMore] =
    useState(true);

  const [loading, setLoading] = useState(false);

  const currentNotify =
    activeTab === "general"
      ? generalNotify
      : staffNotify;

  const hasMore =
    activeTab === "general"
      ? generalHasMore
      : staffHasMore;

  async function changeTab(
    tab: "general" | "staff"
  ) {
    if (tab === activeTab) return;

    setActiveTab(tab);

    if (tab === "staff" && staffNotify.length === 0) {
      setLoading(true);

      try {
        const result = await loadNotify(
          true,
          0,
          isAdmin
        );

        setStaffNotify(result.notify);
        setStaffHasMore(result.hasMore);
      } finally {
        setLoading(false);
      }
    }
  }

  async function handleLoadMore() {
    if (loading || !hasMore) return;

    setLoading(true);

    try {
      const rules = activeTab === "staff";

      const result = await loadNotify(
        rules,
        currentNotify.length,
        isAdmin
      );

      if (activeTab === "general") {
        setGeneralNotify((prev) => [
          ...prev,
          ...result.notify,
        ]);

        setGeneralHasMore(result.hasMore);
      } else {
        setStaffNotify((prev) => [
          ...prev,
          ...result.notify,
        ]);

        setStaffHasMore(result.hasMore);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      {isAdmin && (
        <div className="mb-8 flex w-fit gap-1 rounded-2xl bg-zinc-100 p-1">
          <button
            type="button"
            onClick={() => changeTab("general")}
            className={`
              rounded-xl
              px-5
              py-2.5
              text-sm
              font-medium
              transition
              cursor-pointer
              ${
                activeTab === "general"
                  ? "bg-white text-prpl shadow-sm"
                  : "text-zinc-500 hover:text-zinc-800"
              }
            `}
          >
            Общие
          </button>

          <button
            type="button"
            onClick={() => changeTab("staff")}
            className={`
              rounded-xl
              px-5
              py-2.5
              text-sm
              font-medium
              transition
              cursor-pointer
              ${
                activeTab === "staff"
                  ? "bg-white text-prpl shadow-sm"
                  : "text-zinc-500 hover:text-zinc-800"
              }
            `}
          >
            Сотрудникам
          </button>
        </div>
      )}

      <div className="space-y-6">
        {currentNotify.map((item) => (
          <article
            key={item.id}
            className="
              overflow-hidden
              rounded-3xl
              border
              border-zinc-200
              bg-white
              shadow-sm
              transition
              hover:shadow-md
            "
          >
            <div className="border-b border-zinc-100 p-6 sm:p-8">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <div className="mb-4 flex flex-wrap items-center gap-2">
                    <span
                      className="
                        inline-flex
                        items-center
                        rounded-full
                        bg-prpl/10
                        
                        py-1
                        text-sm
                        font-medium
                        text-prpl
                      "
                    >
                      {item.name}
                    </span>

                    {item.rules ? (
                      <span
                        className="
                          inline-flex
                          items-center
                          rounded-full
                          bg-amber-50
                          px-3
                          py-1
                          text-xs
                          font-medium
                          text-amber-700
                        "
                      >
                        Для сотрудников
                      </span>
                    ) : (
                        <span
                        className="
                          inline-flex
                          items-center
                          rounded-full
                          bg-amber-50
                          px-3
                          py-1
                          text-xs
                          font-medium
                          text-amber-700
                        "
                      >
                        Для всех
                      </span>
                    )}
                  </div>

                  <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl">
                    {item.title}
                  </h2>

                  {item.suptitle && (
                    <p className="mt-2 text-base text-zinc-500">
                      {item.suptitle}
                    </p>
                  )}
                </div>

                <div
                  className="
                    flex
                    shrink-0
                    items-center
                    gap-2
                    rounded-xl
                    bg-zinc-50
                    px-3
                    py-2
                    text-sm
                    text-zinc-500
                  "
                >
                  <CalendarDays size={16} />

                  {new Date(
                    item.created_at
                  ).toLocaleDateString("ru-RU", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-8">
              <div className="
                  prose
                  prose-zinc
                  max-w-none
                  prose-headings:font-semibold
                  prose-headings:text-zinc-900
                  prose-h3:mb-3
                  prose-h3:mt-7
                  prose-h3:text-lg
                  prose-p:leading-7
                  prose-p:text-zinc-600
                  prose-li:text-zinc-600
                  prose-li:leading-7
                  prose-strong:text-zinc-800
                  prose-ul:my-4
                "
                dangerouslySetInnerHTML={{
                  __html: item.description || "",
                }}
              />
            </div>

            <div className="border-t border-zinc-100 bg-zinc-50/60 px-6 py-4 sm:px-8">
              <div className="flex items-center gap-2 text-xs text-zinc-400">
                <ChevronRight size={14} />
                Обновление системы
              </div>
            </div>
          </article>
        ))}
      </div>

      {currentNotify.length === 0 && !loading && (
        <div className="rounded-3xl border border-dashed border-zinc-300 bg-white p-12 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-400">
            <Settings2 size={22} />
          </div>

          <h2 className="mt-4 text-lg font-medium text-zinc-800">
            Пока нет обновлений
          </h2>

          <p className="mt-1 text-sm text-zinc-500">
            Здесь будут появляться новости и изменения платформы.
          </p>
        </div>
      )}

      {hasMore && currentNotify.length > 0 && (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={handleLoadMore}
            disabled={loading}
            className="
              inline-flex
              items-center
              gap-2
              rounded-xl
              bg-prpl
              px-6
              py-3
              text-sm
              font-medium
              text-white
              transition
              hover:opacity-90
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            {loading && (
              <Loader2
                size={17}
                className="animate-spin"
              />
            )}

            {loading
              ? "Загрузка..."
              : "Загрузить ещё"}
          </button>
        </div>
      )}
    </div>
  );
}
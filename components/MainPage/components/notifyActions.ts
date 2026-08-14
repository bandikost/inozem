"use server";

import { getNotify } from "@/lib/notify";

export async function loadNotify(
  rules: boolean,
  offset: number,
  isAdmin: boolean
) {

  if (rules && !isAdmin) {
    return {
      notify: [],
      hasMore: false,
    };
  }

  const limit = 2;

  const rows = await getNotify(
    limit + 1,
    offset,
    rules
  );

  const hasMore = rows.length > limit;

  return {
    notify: rows.slice(0, limit),
    hasMore,
  };
}
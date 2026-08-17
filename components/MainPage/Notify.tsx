import { UserRow } from "@/app/interface/user";
import { getProfile } from "@/lib/getProfile";
import { getNotify } from "@/lib/notify";
import { Settings2 } from "lucide-react";
import { cookies } from "next/headers";
import NotifyList from "./components/NotifyList";

export default async function NotifyPage() {
  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;

  let user: UserRow | null = null;

  if (token) {
    user = await getProfile(token);
  }

  const isAdmin = Number(user?.isAdmin) === 1;

  console.log("USER:", user);
  console.log("IS ADMIN:", isAdmin);

  const initialRows = await getNotify(2, 0, false);

  const initialNotify = initialRows.slice(0, 1);
  const initialHasMore = initialRows.length > 1;

  return (
    <section className="w-full px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-6xl">

        <div className="mb-8">
              <h4 className="text-3xl font-semibold text-prpl">
                Обновления
              </h4>      
        </div>

        <NotifyList
          initialNotify={initialNotify}
          isAdmin={isAdmin}
          initialHasMore={initialHasMore}
        />

      </div>
    </section>
  );
}
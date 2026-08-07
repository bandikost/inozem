import { getActivity } from "@/lib/activity";

export default async function ActivityTable() {
  const activity = await getActivity();

  return (
    <table>
      {/* таблица */}
    </table>
  );
}
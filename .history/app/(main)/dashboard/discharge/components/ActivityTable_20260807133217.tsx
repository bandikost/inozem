import { getActivityUsers } from "@/lib/activity";

export default async function ActivityTable() {
  const activity = await getActivityUsers();

  return (
    <table>
      {/* таблица */}
    </table>
  );
}
import { getTests } from "@/lib/test";

export default async function TestsTable() {
  const tests = await getTests();

  return (
    <table>
      {/* таблица */}
    </table>
  );
}
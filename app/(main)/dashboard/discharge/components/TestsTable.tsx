import { getTests } from "@/lib/test";
import TestsTableClient from "./TestsTableClient";

export default async function TestsTable() {
  const tests = await getTests();

  return <TestsTableClient tests={tests} />;
}
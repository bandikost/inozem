import { TestsCreated } from "@/app/interface/tests_creator";
import LoadingLink from "@/components/Load/LoadingLink";

interface Props {
  testlist: TestsCreated[];
}

export default function TestList({ testlist }: Props) {
  return (
    <div className="grid gap-4 mt-8">
      {testlist.map((test) => (
        <div
          key={test.id}
          className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
        >
          <h2 className="text-xl font-semibold text-prpl">
            {test.title}
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            {test.slug}
          </p>

          <LoadingLink
            href={`/dashboard/test_creator/test/${test.slug}`}
            className="inline-block mt-4"
          >
            Перейти к редактированию
          </LoadingLink>
        </div>
      ))}
    </div>
  );
}
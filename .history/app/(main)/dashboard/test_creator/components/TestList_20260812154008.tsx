import { TestsCreated } from "@/app/interface/tests_creator";

interface Props {
    testlist: TestsCreated[];
}

export default function TestList({ testlist }: Props) {
    return (
        <>
            {testlist.map((test) => (
                <div key={test.id}>
                    {test.slug}
                </div>
            ))}
        </>
    );
}
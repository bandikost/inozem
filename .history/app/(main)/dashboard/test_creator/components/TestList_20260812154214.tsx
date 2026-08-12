import { TestsCreated } from "@/app/interface/tests_creator";

interface Props {
    testlist: TestsCreated[];
}

export default function TestList({ testlist }: Props) {
    return (
        <div>
            {testlist.map((test) => (
                <div key={test.id}>
                    <h2>{test.title}</h2>
                    <p>{test.slug}</p>
                    <p>{String(test.created_at)}</p>
                </div>
            ))}
        </div>
    );
}
import { TestsCreated } from "@/app/interface/tests_creator";
import LoadingLink from "@/components/Load/LoadingLink";

interface Props {
    testlist: TestsCreated[];
    slug: string
}


export default function TestList({ testlist, slug }: Props) {
    return (
        <div>
            {testlist.map((test) => (
                <div key={test.id}>
                    <h2>{test.title}</h2>
                    <p>{test.slug}</p>
                    <LoadingLink href={`/dashboard/test_creator/test/${slug}`}>Перейти к редактированию</LoadingLink>
                </div>
            ))}
        </div>
    );
}


interface Props {
    testlist: string
}

export default function TestList({testlist} : Props) {

    return (
        <>
        {testlist.id}
        </>
    )
}
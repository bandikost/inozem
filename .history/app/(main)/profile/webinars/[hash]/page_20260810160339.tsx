import WebinarRoom from "./WebinarRoom"

interface Props {
  params: Promise<{
    hash: string
  }>
}

export default async function WebinarPage({ params }: Props) {
  const { hash } = await params

  return (
    <main className="min-h-screen pb-10">
      <div className="container max-w-6xl px-2 my-27">

        <h1 className="text-2xl md:text-3xl font-semibold text-prpl">
          Вебинар
        </h1>

        <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_12px_40px_rgba(15,23,42,0.08)]">
          <WebinarRoom hash={hash} />
        </div>

      </div>
    </main>
  )
}
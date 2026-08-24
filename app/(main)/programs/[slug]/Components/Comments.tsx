import CommentForm from "@/components/forms/CommentForm"
import { getComments } from "@/lib/comments"
import { UserRound } from "lucide-react"

interface CommentsProps {
  programmId: number
}

export default async function Comments({ programmId }: CommentsProps) {
  const comments = await getComments(programmId)

  return (
    <section className="mt-12">
      <div className="overflow-hidden rounded-[28px] border border-slate-200/80 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.06)]">


        <div className="border-b border-slate-100 px-5 py-6 md:px-8 md:py-7">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">
                Комментарии к программе
              </h2>

              {comments.length > 0 && (
                <span className="rounded-full bg-violet-50 px-2.5 py-1 text-xs font-semibold text-violet-700">
                  {comments.length}
                </span>
              )}
            </div>

            <p className="text-sm text-slate-500">
              Поделитесь своим впечатлением об обучении
            </p>
          </div>
        </div>


        <div className="border-b border-slate-100 bg-slate-50/50 px-5 py-6 md:px-8">
          <CommentForm programmId={programmId} />
        </div>


        <div className="px-5 py-6 md:px-8 md:py-8">

          {comments.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-xl text-slate-400">
                💬
              </div>

              <p className="font-medium text-slate-700">
                Пока нет комментариев
              </p>

              <p className="mt-1 max-w-sm text-sm text-slate-400">
                Будьте первым, кто поделится своим впечатлением о программе.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {comments.map((c) => {
                const fullName = [
                  c.last_name,
                  c.name,
                  c.patronymic,
                ]
                  .filter(Boolean)
                  .join(" ")

                

                return (
                  <article key={c.id} className="group flex gap-4 p-4 border border-gray-200 rounded-2xl shadow">
    
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-violet-100 text-sm font-semibold text-violet-700">
                      <UserRound />
                    </div>

                    <div className="min-w-0 flex-1">

                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <span className="font-semibold text-slate-900">
                          {fullName}
                        </span>

                       <time className="text-xs text-slate-400">
                            {c.comment_date} · {c.comment_time}
                        </time>
                      </div>

                      <p className="mt-1 whitespace-pre-wrap text-[15px] leading-7 text-slate-600">
                        {c.comment}
                      </p>

                    </div>
                  </article>
                )
              })}
            </div>
          )}

        </div>
      </div>
    </section>
  )
}
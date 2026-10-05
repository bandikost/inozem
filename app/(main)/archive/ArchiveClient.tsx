'use client'

import { useEffect, useState } from "react"
import { CalendarDays, Clock, Play } from "lucide-react"


interface Props {
    programs: any[]
}
export default function ArchiveClient({programs}: Props) {
    const [webinars, setWebinars] = useState<any[]>([])
    const [webinarsLoading, setWebinarsLoading] = useState(true)
    const [activeVideo, setActiveVideo] = useState<number | null>(null)

useEffect(() => {
    async function loadWebinars() {
        try {
            const res = await fetch("/api/pruffme/webinar-records")

            if (!res.ok) {
                throw new Error("Ошибка загрузки записей")
            }

            const data = await res.json()

            const filteredWebinars = data.result
            .filter((webinar: any) => webinar.duration >= 900)
            .filter((webinar: any) =>
                programs.some((program: any) => {
                    const webinarName = webinar.name?.trim().toLowerCase()
                    const programSpec = program.specialization?.trim().toLowerCase()

                    return (
                        webinarName &&
                        programSpec &&
                        webinarName.includes(programSpec)
                    )
                })
            )

        setWebinars(filteredWebinars)

                    

        } catch (error) {
            console.error("WEBINARS ERROR:", error)
        } finally {
            setWebinarsLoading(false)
        }
    }

    loadWebinars()
}, [programs])


    if (webinarsLoading) {
        return (
            <section className="px-6 py-8">
                <div className="mx-auto max-w-6xl">
                    <div className="grid gap-6 md:grid-cols-2">
                        {[1, 2, 3, 4].map((item) => (
                            <div
                                key={item}
                                className="overflow-hidden rounded-3xl border border-slate-200 bg-white"
                            >
                                <div className="aspect-video animate-pulse bg-slate-100" />
                                <div className="space-y-3 p-5">
                                    <div className="h-5 w-3/4 animate-pulse rounded bg-slate-100" />
                                    <div className="h-4 w-1/3 animate-pulse rounded bg-slate-100" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        )
    }

    if (webinars.length === 0) {
        return (
            <section className="px-6 py-8">
                <div className="mx-auto max-w-6xl">
                    <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-12 text-center">
                        <p className="text-slate-500">
                            Записей вебинаров пока нет
                        </p>
                    </div>
                </div>
            </section>
        )
    }

    return (
        <section className="px-6 py-8">
            <div className="mx-auto max-w-6xl">

                <div className="mb-8">
                    <h1 className="text-2xl font-semibold tracking-tight text-prpl md:text-3xl">
                        Архив вебинаров
                    </h1>

                    <p className="mt-2 text-sm text-slate-500 md:text-base">
                        Записи прошедших вебинаров, доступные для просмотра
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">

                    {webinars.map((webinar) => {
                        const isPlaying = activeVideo === webinar.id

                        const date = webinar.creationdate
                            ? new Date(
                                  webinar.creationdate.replace(" ", "T")
                              )
                            : null

                        const duration = webinar.duration
                            ? Math.floor(webinar.duration / 60)
                            : null

                        return (
                            <article
                                key={webinar.id}
                                className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_8px_30px_rgba(15,23,42,0.06)] transition-all duration-200 hover:-translate-y-1 hover:border-violet-200 hover:shadow-[0_14px_40px_rgba(15,23,42,0.10)]"
                            >

                                <div className="relative aspect-video overflow-hidden bg-slate-950">

                                    {isPlaying ? (
                                        <video
                                            controls
                                            autoPlay
                                            className="h-full w-full object-contain"
                                        >
                                            <source
                                                src={webinar.url}
                                                type="video/mp4"
                                            />

                                            Ваш браузер не поддерживает видео.
                                        </video>
                                    ) : (
                                        <>
                                            <img
                                                src={webinar.preview}
                                                alt={webinar.name}
                                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            />


                                            <div className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/30" />

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setActiveVideo(webinar.id)
                                                }
                                                className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-violet-700 shadow-xl transition-all duration-200 hover:scale-110 hover:bg-white"
                                                aria-label={`Смотреть ${webinar.name}`}
                                            >
                                                <Play
                                                    size={25}
                                                    fill="currentColor"
                                                    className="ml-1"
                                                />
                                            </button>

                                            {duration !== null && (
                                                <div className="absolute bottom-3 right-3 rounded-lg bg-black/70 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
                                                    {duration} мин
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>

                                <div className="p-5">

                                    <h2 className="text-lg font-semibold leading-snug text-slate-900 transition-colors group-hover:text-violet-700">
                                        {webinar.name}
                                    </h2>

                                    <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-500">

                                        {date && (
                                            <span className="flex items-center gap-1.5">
                                                <CalendarDays
                                                    size={15}
                                                    strokeWidth={1.7}
                                                />

                                                {date.toLocaleDateString(
                                                    "ru-RU",
                                                    {
                                                        day: "2-digit",
                                                        month: "long",
                                                        year: "numeric",
                                                    }
                                                )}
                                            </span>
                                        )}

                                        {duration !== null && (
                                            <span className="flex items-center gap-1.5">
                                                <Clock
                                                    size={15}
                                                    strokeWidth={1.7}
                                                />

                                                {duration} мин.
                                            </span>
                                        )}

                                    </div>

                                </div>
                            </article>
                        )
                    })}

                </div>
            </div>
        </section>
    )
}
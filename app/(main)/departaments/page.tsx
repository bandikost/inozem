import LoadingLink from "@/components/Load/LoadingLink";
import { getDepartaments } from "@/lib/departaments";
import { ChevronRight } from "lucide-react";

export default async function Page() {
    const departaments = await getDepartaments();

    return (
        <section className="min-h-screen">
            <div className="container mx-auto px-2 my-27">

                <nav className="mb-8 flex flex-wrap items-center gap-x-2 gap-y-2 text-md text-zinc-500">

                    <LoadingLink href="/" className="shrink-0 transition hover:text-blue hover:underline">
                        Главная
                    </LoadingLink>

                    <ChevronRight size={14} className="shrink-0" />

                    <span className="min-w-0 flex-1 truncate text-zinc-800 opacity-70">
                        Кафедры
                    </span>

                </nav>

                <h1 className="text-prpl text-center">
                    Кафедры
                </h1>

                <div className="my-10 flex items-center gap-4">
                    <div className="h-12 w-2 rounded-full bg-prpl" />

                    <div>
                        <h2 className="text-3xl font-semibold text-zinc-900">
                            Кафедры академии
                        </h2>

                        <p className="mt-1 text-zinc-500">
                            Образовательные и научные подразделения
                        </p>
                    </div>
                </div>

                <ul className="grid grid-cols-1 gap-8 md:grid-cols-2">

                    {departaments.map((dep) => (
                        <li key={dep.id}>
                            <LoadingLink
                                href={`/departaments/${dep.slug}`}
                                className="
                                    group
                                    relative
                                    flex
                                    h-full
                                    flex-col
                                    overflow-hidden
                                    rounded-3xl
                                    border
                                    border-zinc-200
                                    bg-white
                                    shadow-md
                                    transition-all
                                    duration-300
                                    hover:-translate-y-2
                                    hover:shadow-2xl
                                "
                            >

                                <div className="h-1 w-full bg-gradient-to-r from-prpl to-green" />

                                <div className="flex h-full flex-col p-7">

                                    <div className="mb-6 flex items-center justify-between">

                                        <span className="
                                            inline-flex
                                            items-center
                                            rounded-full
                                            bg-prpl/10
                                            px-4
                                            py-2
                                            text-sm
                                            font-medium
                                            text-prpl
                                        ">
                                            Кафедра
                                        </span>

                                        <span className="
                                            text-sm
                                            font-medium
                                            text-zinc-400
                                        ">
                                            {String(dep.id).padStart(2, "0")}
                                        </span>

                                    </div>

                                    <h3 className="
                                        flex-1
                                        text-2xl
                                        font-semibold
                                        leading-snug
                                        text-zinc-900
                                        transition-colors
                                        group-hover:text-prpl
                                    ">
                                        {dep.name}
                                    </h3>
                                    <div className="
                                        mt-8
                                        flex
                                        items-center
                                        justify-between
                                        border-t
                                        pt-5
                                    ">

                                        <span className="text-sm text-zinc-400">
                                            Образовательное подразделение
                                        </span>

                                        <div className="
                                            flex
                                            items-center
                                            gap-2
                                            font-medium
                                            text-prpl
                                        ">
                                            Подробнее

                                            <ChevronRight
                                                size={18}
                                                className="
                                                    transition-transform
                                                    group-hover:translate-x-1
                                                "
                                            />
                                        </div>

                                    </div>

                                </div>
                            </LoadingLink>
                        </li>
                    ))}

                </ul>

            </div>
        </section>
    );
}
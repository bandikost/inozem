import { notFound } from "next/navigation";
import { getDepartmentsBySlug } from "@/lib/departaments";
import LoadingLink from "@/components/Load/LoadingLink";
import { ChevronRight } from "lucide-react";

interface PageProps {
  params: { slug: string }
}

export default async function Page({ params }: PageProps ) {
  const { slug } = await params

  const departament = await getDepartmentsBySlug(slug)

    if (!departament) {
        notFound();
    }

    return (
         <section className="min-h-screen">
            <div className="container mx-auto px-2 my-27">

                <nav className="mb-8 flex flex-wrap items-center gap-x-2 gap-y-2 text-md text-zinc-500">

                    <LoadingLink href="/" className="shrink-0 transition hover:text-blue hover:underline">
                        Главная
                    </LoadingLink>

                    <ChevronRight size={14} className="shrink-0" />

                    <LoadingLink href="/departaments" className="shrink-0 transition hover:text-blue hover:underline">
                        Кафедры
                    </LoadingLink>

                    <ChevronRight size={14} className="shrink-0" />

                    <span className="min-w-0 flex-1 truncate text-zinc-800 opacity-70">
                        {departament.name}
                    </span>

                </nav>
                </div>
                </section>
    );
}
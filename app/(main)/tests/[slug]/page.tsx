
import LoadingLink from "@/components/Load/LoadingLink";
import { getTestsCreatedBySlug } from "@/lib/tests_creator/tests";
import { ChevronRight } from "lucide-react";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}


export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  const test = await getTestsCreatedBySlug(slug)


  return (
        <section className="min-h-screen">
            <div className="container mx-auto px-2 my-27">
               <nav className="mb-8 flex flex-wrap items-center gap-x-2 gap-y-2 text-md text-zinc-500">
              
                    <LoadingLink href="/" className="shrink-0 hover:text-blue transition hover:underline">
                      Главная
                    </LoadingLink>
              
                    <ChevronRight size={14} className="shrink-0" />
        
                     <LoadingLink href="/programs" className="shrink-0 hover:text-blue transition hover:underline">
                      Образование
                    </LoadingLink>
        
                    <ChevronRight size={14} className="shrink-0" />
              
                <span className="min-w-0 flex-1 truncate text-zinc-800 opacity-70">
                  Тестирование {test[0].title}
                </span>
              
              </nav>
              </div>
              </section>

  )

}
import { getAccred } from "@/lib/accred";
import SideButtons from "./components/SideButtons";
import AccredHero from "./components/AccredHero";
import AccredIntro from "./components/AccredIntro";
import AccredNotice from "./components/AccredNotice";
import AccredSpecialties from "./components/AccredSpecialties";
import AccredStages from "./components/AccredStages";
import AccredSummary from "./components/AccredSummary";
import LoadingLink from "@/components/Load/LoadingLink";
import { ChevronRight } from "lucide-react";
import { higherEducation, secondaryEducation } from "@/data/accred";
import AccredResults from "./components/AccredResults";


export const dynamic = "force-dynamic"

export const metadata = {
  title:
    "Аккредитация | ЧОУ ДПО «Академия медицинского образования им. Ф.И.Иноземцева»",
};


export default async function Page() {

  const accred = await getAccred();

  return (
    <section className="min-h-screen">

      <div className="container mx-auto px-4 my-27">

        <nav className="mb-8 flex flex-wrap items-center gap-x-2 gap-y-2 text-md text-zinc-500 px-2 md:px-6">

          <LoadingLink href="/" className="shrink-0 hover:text-blue transition hover:underline">
            Главная
          </LoadingLink>

          <ChevronRight size={14} className="shrink-0" />

          <span className="min-w-0 flex-1 truncate text-zinc-800 opacity-70">
            Аккредитация
          </span>

        </nav>


        <div className="mx-auto max-w-6xl">
          <AccredHero />

          <div className="space-y-10">
            <AccredIntro />
            <AccredNotice />
            <AccredSpecialties higherEducation={higherEducation} secondaryEducation={secondaryEducation}/>
            <AccredStages />
            <SideButtons />
            <AccredResults accred={accred} />
            <AccredSummary />
          </div>

        </div>

      </div>

    </section>
  );
}
import { notFound } from "next/navigation";
import { getDepartaments, getDepartmentsBySlug } from "@/lib/departaments";

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
        <div className="container mx-auto px-2 my-27">
            <h1 className="text-4xl font-bold">
                {departament.name}
            </h1>

            <p>slug: {departament.slug}</p>
        </div>
    );
}
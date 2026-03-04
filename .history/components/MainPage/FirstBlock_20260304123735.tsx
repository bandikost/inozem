import Image from "next/image";
import Link from "next/link";
import ImageWithSkeleton from "../ui/ImageWithSkeleton";

const cards = [
  {
    title: "Образовательные мероприятия",
    description: "Семинары, мастер-классы и конференции",
  },
  {
    title: "Подобрать цикл обучения",
    description: "Подбор программы обучения",
  },
  {
    title: "Аккредитация",
    description: "Информация и итоги аккредитации",
  },
  {
    title: "Акции",
    description: "Специальные предложения",
  },
];

export default async function FirstBlock() {

    return (
        <section className="grid tablet:flex gap-6 items-center justify-center tablet:items-start px-4">
  
                <div className="border-2 border-zinc-300 mt-4 rounded-xl shadow-2xl bg-white">
                  <div className="relative w-full max-w-[520px] max-h-[520px] aspect-[16/9]">
                    <ImageWithSkeleton
                      src="https://storage.yandexcloud.net/inozemstorage/main/banner/od.png"
                      alt="Изображение академии"
                      wrapperClassName="max-w-[520px] max-h-[520px] "
                      aspect="1/1"
                      
                    />
                  </div>
                </div>

                <div className="grid  gap-3 py-4">

                   {cards.map((card, index) => (
                    <div key={index} className={` rounded-xl shadow border border-gray-300 ${index >= 2 ? "md:col-span-1" : "lg:col-span-2 "}`}>
                        <div className={`flex p-3 ${index >= 2 ? "flex-row md-custom-flex-col items-center" : ""}`}>

                         <Image alt="Изображение академии на главной странице" width={100} height={100} src={"/Images/Placeholder.png"} 
                         className="w-30 h-30 object-cover border border-zinc-400 rounded-xl"  />

                        <div className={`flex flex-col justify-between px-3  ${index >= 2 ? "items-start md-custom-items-center" : "items-start"}`}>
                            <h3 className="mt-1 !font-semibold">{card.title}</h3>
                            <p className={`mt-2  ${index >= 2 ? "text-small md-custom-text-center" : " text-small xs:text-base"}`}>{card.description}</p>

                            <Link
                            href="/"
                            className="inline-flex items-center my-2 button-more"
                            >
                            Подробнее
                            </Link>
                        </div>
                        </div>
                    </div>
                    ))}
                </div>
       
        </section>
    )
}
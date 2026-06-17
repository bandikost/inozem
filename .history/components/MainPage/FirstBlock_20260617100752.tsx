import Link from "next/link";
import ImageWithSkeleton from "../ui/LazyLoad/ImageWithSkeleton";

const cards = [
  {
    title: "Мероприятия",
    description: "Семинары, мастер-классы и конференции",
    img: "/Images/main/icons/activity.jpg",
    link: "/activity"
  },
  {
    title: "Обучение",
    description: "Подбор программы обучения",
    img: "/Images/main/icons/learn.jpg",
    link: "/programs"
  },
   {
    title: "Акции",
    description: "Специальные предложения",
    img: "/Images/main/icons/sale.jpg",
    link: "/promo"
  },
  {
    title: "Аккредитация",
    description: "Информация и итоги аккредитации",
    img: "/Images/main/icons/accred.jpg",
    link: "/accreditation"
  },
 
];

export default async function FirstBlock() {

    return (
        <section className="grid tablet:flex gap-6 items-center justify-center tablet:items-start px-4">
          
                <div className="border-2 border-zinc-300 mt-4 rounded-xl shadow-2xl bg-white">
                  <div className="relative w-full max-w-[500px] max-h-[500px] aspect-[16/9]">
                    <ImageWithSkeleton
                      src="https://storage.yandexcloud.net/inozemstorage/main/banner/1.jpg"
                      alt="Изображение академии"
                      wrapperClassName="max-w-[500px] max-h-[500px] "
                      aspect="1/1"
                      
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 py-4">

                   {cards.map((card, index) => (
                    <div key={index} className={` rounded-xl shadow border border-gray-300`}>
                        <div className={`flex flex-col sm:flex-row p-3 md-custom-flex-col items-start sm:items-center`}>

                         {card.img && (
                            <ImageWithSkeleton src={card.img} alt="Изображение академии" wrapperClassName="w-[80px] sm:w-[80px] h-[80px] sm:h-[80px]" aspect="1/1" />
                          )}

                        <div className={`flex flex-col justify-between px-3  items-start md-custom-items-center`}>
                            <h3 className="mt-1 !font-semibold !text-md sm:!text-xl">{card.title}</h3>
                            <p className={`mt-2  text-sm`}>{card.description}</p>

                            <Link href={`${card.link}`} className="inline-flex items-center my-2 button-more w-full sm:w-auto">Подробнее</Link>
                        </div>
                        </div>
                    </div>
                    ))}
                </div>
       
        </section>
    )
}
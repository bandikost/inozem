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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6">
  {cards.map((card, index) => (
    <div
      key={index}
      className="
        group
        rounded-2xl
        border border-gray-200
        bg-white
        shadow-sm
        hover:shadow-xl
        hover:-translate-y-1
        transition-all
        duration-300
        overflow-hidden
      "
    >
      <div className="flex flex-col sm:flex-row gap-5 p-6 h-full">
        {card.img && (
          <ImageWithSkeleton
            src={card.img}
            alt="Изображение"
            wrapperClassName="w-20 h-20 shrink-0 mx-auto sm:mx-0"
            aspect="1/1"
          />
        )}
 
        <div className="flex flex-col flex-1">
          <h3 className="font-semibold text-lg sm:text-xl leading-tight">
            {card.title}
          </h3>

          <p className="mt-3 text-sm text-gray-600 flex-1 leading-6">
            {card.description}
          </p>

          <Link href={card.link} className="button-more mt-6 w-full">
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
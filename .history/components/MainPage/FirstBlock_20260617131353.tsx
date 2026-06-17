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
        <section className="w-full mx-auto px-4 py-8">
  <div className="grid lg:grid-cols-[1.2fr_0.8fr]">

   
      <ImageWithSkeleton
        src="https://storage.yandexcloud.net/inozemstorage/main/banner/1.jpg"
        alt="Изображение академии"
        wrapperClassName="w-[600px] h-[600px]"
        aspect="4/5"
      />
   

    <div className="grid gap-5">
      {cards.map((card, index) => (
        <Link
          key={index}
          href={card.link}
          className="
            group
            rounded-2xl
            border
            border-gray-200
            bg-white
            p-6
            shadow-sm
            hover:shadow-xl
            hover:-translate-y-1
            hover:border-sky-300
            transition-all
            duration-300
          "
        >
          <div className="flex items-center gap-5">

            <div className="w-16 h-16 rounded-2xl bg-sky-50 flex items-center justify-center shrink-0">
              <ImageWithSkeleton
                src={card.img}
                alt={card.title}
                wrapperClassName="w-10 h-10"
                aspect="1/1"
              />
            </div>

            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900">
                {card.title}
              </h3>

              <p className="mt-2 text-gray-500 text-sm leading-6">
                {card.description}
              </p>

              <div className="mt-4 inline-flex items-center gap-2 text-sky-700 font-medium group-hover:gap-3 transition-all">
                Подробнее
                <span>→</span>
              </div>
            </div>

          </div>
        </Link>
      ))}
    </div>

  </div>
</section>
    )
}
import Link from "next/link";
import ImageWithSkeleton from "../ui/LazyLoad/ImageWithSkeleton";
import LoadingLink from "../Load/LoadingLink";

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
        <section className=" mx-auto px-4 py-8">
  <div className="grid gap-8 grid-cols-1 justify-center items-center lg:grid-cols-[1.1fr_1.4fr]">

   
      <ImageWithSkeleton
        src="https://storage.yandexcloud.net/inozemstorage/main/banner/1.jpg"
        alt="Изображение академии"
        wrapperClassName="max-h-[600px]
          max-w-[600px]
          
          rounded-3xl
          object-cover"
        aspect="4/5"
      />
   

    <div className="grid gap-3">
      {cards.map((card, index) => (
        <LoadingLink
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
            hover:border-purple-300
            transition-all
            duration-300
          "
        >
          <div className="flex items-center gap-5">

        
              <ImageWithSkeleton
                src={card.img}
                alt={card.title}
                wrapperClassName="w-14 h-14"
                aspect="1/1"
              />
           

            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900">
                {card.title}
              </h3>

              <p className="mt-2 text-gray-500 text-sm leading-6">
                {card.description}
              </p>

              <div className="mt-4 inline-flex items-center gap-2 text-blue font-medium group-hover:gap-3 transition-all">
                Подробнее
                <span>→</span>
              </div>
            </div>

          </div>
        </LoadingLink>
      ))}
    </div>

  </div>
</section>
    )
}
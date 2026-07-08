import { getFeedback } from "@/lib/feedbacks";
import { cookies } from "next/headers";
import FeedbackForm from "./FeedbackForm";
import { getProfile } from "@/lib/getProfile";
import FeedbacksCarousel from "./Feedbacks";
import LoadingLink from "@/components/Load/LoadingLink";
import { ChevronRight } from "lucide-react";

export const revalidate = 3600


export const metadata = {
  title: 'Отзывы | ЧОУ ДПО «Академия медицинского образования им. Ф.И.Иноземцева»',
}

export default async function Page() {
    const cookieStore = await cookies() 
    const token = cookieStore.get("token")?.value  
    const feedback = await getFeedback()  
    let user = null
    if (token) user = await getProfile(token)

    const hasUserFeedback = user ? feedback.some(f => f.user_id === user.id) : false  

  return (
   <section className="min-h-screen">
    <div className="container mx-auto px-4 my-27">
       <nav className="mb-8 flex flex-wrap items-center gap-x-2 gap-y-2 text-md text-zinc-500 px-6">
      
            <LoadingLink href="/" className="shrink-0 hover:text-blue transition hover:underline">
              Главная
            </LoadingLink>
      
            <ChevronRight size={14} className="shrink-0" />
      
        <span className="min-w-0 flex-1 truncate text-zinc-800 opacity-70">
          Отзывы
        </span>
      
      </nav>
  
  <div className="absolute left-[-150px] top-0 h-[450px] w-[450px] rounded-full bg-prpl/5 blur-3xl" />

  <div className="absolute right-[-150px] top-[300px] h-[450px] w-[450px] rounded-full bg-green/5 blur-3xl" />

  <div className="relative z-10 max-w-7xl mx-auto px-4">

    <div className="pt-28 text-center">

      <h1 className="mt-6 text-prpl">
        Отзывы об академии
      </h1>

      <p className="mx-auto mt-5 max-w-3xl text-lg text-zinc-600">
        Реальные отзывы наших слушателей и выпускников.
        Мы внимательно относимся к обратной связи и постоянно
        улучшаем качество образовательных программ.
      </p>

    </div>

    <div className="mt-12 grid gap-4 md:grid-cols-3">

      <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
        <div className="text-4xl font-bold text-prpl">
          {feedback.length}
        </div>

        <p className="mt-2 text-zinc-500">
          Отзывов на сайте
        </p>
      </div>

      <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
        <div className="text-4xl font-bold text-green">
          ★ 5.0
        </div>

        <p className="mt-2 text-zinc-500">
          Средний рейтинг
        </p>
      </div>

      <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
        <div className="text-4xl font-bold text-prpl">
          100%
        </div>

        <p className="mt-2 text-zinc-500">
          Реальные слушатели
        </p>
      </div>

    </div>

    <div className="mt-14 grid gap-8 xl:grid-cols-2">


      <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">

        <div className="mb-6 flex   items-center justify-between">

          <div>
            <h2 className="text-prpl !text-2xl">
              Яндекс Карты
            </h2>

            <p className="text-zinc-500">
              Независимые отзывы пользователей
            </p>
          </div>

          <div className="rounded-full bg-green/10 p-2 text-green flex">
            ★ 5.0
          </div>

        </div>

        <div className="overflow-hidden rounded-2xl border border-zinc-200">
          <iframe
            style={{
              width: "100%",
              height: "650px",
              border: "0",
            }}
            src="https://yandex.ru/maps-reviews-widget/1135084160?comments"
          />
        </div>

      </div>

      <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">

        <div className="mb-6 flex flex-col sm:flex-row text-center sm:text-left items-center justify-between">

          <div>
            <h2 className="text-prpl !text-2xl">
              Отзывы выпускников
            </h2>

            <p className="text-zinc-500">
              Отзывы опубликованные на сайте
            </p>
          </div>

          <div className="rounded-full bg-prpl/10 px-4 py-2 text-prpl text-lg">
            {feedback.length} отзывов
          </div>

        </div>

        <FeedbacksCarousel
          feedback={feedback}
          user={user}
        />

      </div>

    </div>

    <div className="mt-20">

      {token ? (
        !hasUserFeedback ? (

          <div className="rounded-[32px] bg-gradient-to-r from-prpl to-green p-8 md:p-12">

            <div className="text-center text-white">

              <h2 className="!text-white">
                Поделитесь впечатлением
              </h2>

              <p className="mt-3 opacity-90">
                Ваш отзыв поможет другим специалистам сделать выбор.
              </p>

            </div>

            <div className="mt-10 flex justify-center">
              <FeedbackForm user={user} />
            </div>

          </div>

        ) : (

          <div className="rounded-3xl border border-green/20 bg-green/5 p-10 text-center">

            <div className="text-5xl mb-4">
              ✓
            </div>

            <h2 className="text-green">
              Спасибо за ваш отзыв
            </h2>

            <p className="mt-3 text-zinc-600">
              Мы ценим обратную связь и используем её для улучшения качества обучения.
            </p>

          </div>

        )
      ) : (

        <div className="rounded-3xl border border-zinc-200 bg-white p-10 text-center shadow-sm">

          <h2 className="text-prpl">
            Хотите оставить отзыв?
          </h2>

          <p className="mt-3 text-zinc-600">
            Для публикации отзыва необходимо авторизоваться.
          </p>

        </div>

      )}

    </div>

  </div>
      </div>
</section>
  );
}
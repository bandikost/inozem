import { getFeedback } from "@/lib/feedbacks";
import { Lock } from "lucide-react";
import { cookies } from "next/headers";
import FeedbackForm from "./FeedbackForm";
import { getProfile } from "@/lib/getProfile";


export const metadata = {
  title: 'Отзывы | ЧОУ ДПО «Академия медицинского образования им. Ф.И.Иноземцева»',
}

export default async function Page() {
    const cookieStore = await cookies() 
    const token = cookieStore.get("token")?.value  
    const feedback = await getFeedback()
    let user = null
    if (token) user = await getProfile(token)

  return (
    <section className="flex flex-col justify-center pb-20 px-4">
      <h1 className="mt-27 text-prpl text-center">Отзывы об академии</h1>

<div className="grid md:grid-cols-2 gap-6 mt-10 justify-items-center">
    <div style={{ width: '460px', height: '600px', overflow: 'hidden', position: 'relative' }}>
        <iframe style={{width: '100%', height: '100%', border: '1px solid #c5c3c3', borderRadius: '8px', boxSizing: 'border-box'}} src="https://yandex.ru/maps-reviews-widget/1135084160?comments"></iframe>
        <a href="https://yandex.ru/maps/org/akademiya_meditsinskogo_obrazovaniya_im_f_i_inozemtseva/1135084160/" target="_blank" style={{ boxSizing: 'border-box', textDecoration: 'none', color: '#a7a4a4', fontSize: '10px', fontFamily: 'YS Text, sans-serif', padding: '0 16px', position: 'absolute', bottom: '8px', width: '100%', textAlign: 'center', overflow: 'hidden', textOverflow: 'ellipsis', display: 'block', maxHeight: '14px', whiteSpace: 'nowrap',}}>
          Академия медицинского образования им. Ф. И. Иноземцева на карте Санкт‑Петербурга
        </a>
      </div>
      
      <div className="border border-gray-300 shadow-2xl rounded-md p-4 w-[460px]">
        <h2 className="text-prpl !text-xl text-center">Отзывы оставленные на сайте</h2>
        {feedback.map(feed => (
          <div key={feed.id} className="border border-gray-300 shadow rounded-md p-4">
            <p>{feed.last_name} {feed.name} {feed.patronymic}</p>
            <p>{feed.user_text}</p>
            <p></p>

          </div>
        ))}
      </div>

</div>

<div className="grid  justify-items-center rounded-md p-4">
        
        {token ? (
          <FeedbackForm user={user}/>
        ) : (
            <div className="flex flex-col items-center justify-center">
                <p className="mt-4 px-6">Вам нужно авторизироваться, чтобы оставить свой отзыв!</p>
            </div>
        )}
      </div>
      
    </section>
  );
}
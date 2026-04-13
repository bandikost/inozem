import { getFeedback } from "@/lib/feedbacks";
import { Star } from "lucide-react";
import { cookies } from "next/headers";
import FeedbackForm from "./FeedbackForm";
import { getProfile } from "@/lib/getProfile";
import FeedbacksCarousel from "./Feedbacks";


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
    <section className="flex flex-col justify-center pb-20 px-4">
      <h1 className="mt-27 text-prpl text-center ">Отзывы об академии</h1>

<div className="grid md:grid-cols-1 gap-6 mt-10 justify-items-center">

    
      
      <div className=" w-[480px]">
        <h2 className="text-prpl !text-2xl text-center">Отзывы оставленные на сайте</h2>
        <FeedbacksCarousel feedback={feedback} />
      </div>

</div>

<div className="grid justify-items-center rounded-md p-4 mt-10">
        
        {token ? (
  !hasUserFeedback ? (
    <FeedbackForm user={user}/>
  ) : (
    <div className="flex flex-col items-center justify-center">
      <p className="mt-8 px-6 text-center">
        Вы уже оставили отзыв. Благодарим за ваше мнение!
      </p>
    </div>
  )
) : (
  <div className="flex flex-col items-center justify-center">
      <p className="mt-4 px-6">Вам нужно авторизироваться, чтобы оставить свой отзыв!</p>
  </div>
)}
      </div>
      
    </section>
  );
}


import LoadingLink from "@/components/Load/LoadingLink"
import { MessageCircleQuestionMark } from "lucide-react"


export default function QuestionButton() {
   

    return (
        <section className="fixed bottom-2 right-2 z-50">

    <div
        className={`
            absolute bottom-4 right-0
            w-[calc(100vw-2rem)] sm:w-[360px]
            max-w-[360px]
            rounded-2xl
            bg-white
            border 
            border-gray-200
            shadow-2xl
            overflow-hidden
            transition-all duration-300 ease-out`}>
       
   
            <MessageCircleQuestionMark size={26} />

            <LoadingLink href="/question" className="hidden sm:inline">
                Задать вопрос
            </LoadingLink>  
     
    </div>
 
</section>
    )
}
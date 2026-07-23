"use client"

import LoadingLink from "@/components/Load/LoadingLink"
import { MessageCircleQuestionMark } from "lucide-react"

export default function QuestionButton() {

  return (

    <section className="fixed bottom-6 right-6 z-50">

      <LoadingLink
        href="/question"
        aria-label="Задать вопрос"
        className="
          group
          flex
          h-14
          w-14
          items-center
          justify-center
          overflow-hidden
          rounded-full
          bg-blue
          !text-white
          shadow-xl
          transition-all
          duration-300
          hover:w-52
          hover:shadow-2xl
        "
      >

        <MessageCircleQuestionMark
          size={24}
          className="shrink-0"
        />

        <span
          className="
            max-w-0
            overflow-hidden
            whitespace-nowrap
            opacity-0
            transition-all
            duration-300
            group-hover:ml-3
            group-hover:max-w-[140px]
            group-hover:opacity-100
          "
        >
          Задать вопрос
        </span>

      </LoadingLink>

    </section>

  )
}
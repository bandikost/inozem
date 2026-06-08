import { delay } from "@/lib/delay"
import { useLoadingStore } from "@/components/Load/loadingStore"

type SubmitParams<T> = {
  e: React.SubmitEvent<HTMLFormElement>
  captcha: string
  setNotice: (msg: string) => void
  url: string
  body: T
}

export const useSubmitWithCaptcha = () => {
  const show = useLoadingStore((s) => s.show)
  const hide = useLoadingStore((s) => s.hide)

  const handleSubmit = async <T>({ e, captcha, setNotice, url, body }: SubmitParams<T>) => {
    e.preventDefault()

    show()
    
  

    try {
    const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
  
  await delay(1500)

  if (!res.ok) {
    hide()
    setNotice("Ошибка отправки")
    return
  }

  hide()
  alert("Форма отправлена!")
  window.location.href = "/"

} catch {
      hide()
      setNotice("Ошибка сети")
    }
  }

  return handleSubmit
}
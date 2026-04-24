import { useEffect, useId } from "react"

const sitekey = process.env.NEXT_PUBLIC_YANDEX_CAPTCHA_SITEKEY

export const useYandexCaptcha = (
  onVerify: (token: string) => void) => {
  const captchaId = useId()

  useEffect(() => {
    const init = () => {
      if (!window.smartCaptcha) return
      if (!sitekey) return

      window.smartCaptcha.render(
        captchaId,
        {
          sitekey,
          callback: onVerify,
        }
      )
    }

    const t = setTimeout(init, 300)

    return () => clearTimeout(t)
  }, [captchaId, onVerify])

  return captchaId
}
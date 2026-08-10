import type { Metadata } from "next";

import { Nunito, Montserrat_Alternates } from "next/font/google";
import "./globals.css";
import InitialLoader from "@/components/Load/InitialLoader";
import NavigationDone from "@/components/ui/LazyLoad/NavigationProgress";
import QuestionButton from "@/components/ui/Buttons/questionButton";
import Script from "next/script"
import LoadingOverlay from "@/components/Load/LoadingOverlay";
import RouteLoader from "@/components/Load/RouteLoader";
import { Analytics } from "@vercel/analytics/next"
import ScrollToTop from "@/components/ScrollToTop";
import { ToastProvider } from "@/components/ui/Toast/ToastProvider";
import YandexMetrika from "@/components/analytics/yandex";
import Script from "next/script"

const nunito = Nunito({
  variable: "--font-sans",
  subsets: ["latin", "cyrillic"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
})

const montserratAlt = Montserrat_Alternates({
  variable: "--font-montserrat-alt",
  subsets: ["latin", "cyrillic"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "ЧОУ ДПО «Академия медицинского образования им. Ф.И.Иноземцева»",
  description: "Официальный сайт ЧОУ ДПО «Академия медицинского образования им. Ф.И.Иноземцева». Дополнительное профессиональное образование для врачей, медсестер и лиц без медицинского образования.",

   robots: {
    index: false,
    follow: false,
  },
}


export default function RootLayout({ children } : Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru"  className={`${nunito.variable} ${montserratAlt.variable} antialiased`}>
  <body className={`${nunito.variable} ${montserratAlt.variable} antialiased`}>
    <YandexMetrika />
    <ToastProvider>
    <NavigationDone />
    <InitialLoader />
    <QuestionButton />
    <LoadingOverlay />
    <RouteLoader />
    <Analytics />
    {children}
    <Script src="https://smartcaptcha.yandexcloud.net/captcha.js" strategy="afterInteractive"/>
    <ScrollToTop />
    </ToastProvider>
  </body>
</html>

  )
}

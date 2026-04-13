import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import InitialLoader from "@/components/ui/InitialLoader";
import NavigationDone from "@/components/ui/LazyLoad/NavigationProgress";
import QuestionButton from "@/components/ui/Buttons/questionButton";
import Script from "next/script"


const nunito = Nunito({
  variable: "--font-sans",
  subsets: ["latin", "cyrillic"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
})
export const metadata: Metadata = {
  title: "ЧОУ ДПО «Академия медицинского образования им. Ф.И.Иноземцева»",
  description: "Официальный сайт ЧОУ ДПО «Академия медицинского образования им. Ф.И.Иноземцева». Дополнительное профессиональное образование для врачей, медсестер и лиц без медицинского образования.",
}


export default function RootLayout({ children } : Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <head>
    <meta charSet="UTF-8" />
  </head>
  <body className={`${nunito.variable} antialiased`}>
    <NavigationDone />
    <InitialLoader />
    <QuestionButton />
    {children}
    
  </body>
</html>

  )
}

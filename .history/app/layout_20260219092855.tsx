import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import InitialLoader from "@/components/InitialLoader";
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

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
  const notify = () => toast("Привет!")
  return (
    <html lang="en">
  <body className={`${nunito.variable} antialiased`}>
    <InitialLoader />
    <button onClick={notify}>Показать уведомление</button>
      <ToastContainer />
    {children}
  </body>
</html>

  )
}

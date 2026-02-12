import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Header from "@/components/Layouts/Header";
import Footer from "@/components/Layouts/Footer";
import InitialLoader from "@/components/InitialLoader";

const nunito = Nunito({
  variable: "--font-sans",
  subsets: ["latin", "cyrillic"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});
export const metadata: Metadata = {
  title: "ЧОУ ДПО «Академия медицинского образования им. Ф.И.Иноземцева»",
  description: "Официальный сайт ЧОУ ДПО «Академия медицинского образования им. Ф.И.Иноземцева». Дополнительное профессиональное образование для врачей, медсестер и лиц без медицинского образования.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${nunito.variable} antialiased`}>
        <InitialLoader />
        <Header />
        <main className="w-[90%] max-w-[1200px] min-h-screen mx-auto px-4 mt-20">
         {children}
         
        </main>
        <Footer />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import "./globals.css";
import Header from "@/components/Layouts/Header";
import Footer from "@/components/Layouts/Footer";

const mulish = Mulish({
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
      <body className={`${mulish.variable} antialiased`}>
        <Header />
        <main className="w-[90%] max-w-[1200px] mx-auto px-4 mt-20">
         {children}
         
        </main>
        <Footer />
      </body>
    </html>
  );
}

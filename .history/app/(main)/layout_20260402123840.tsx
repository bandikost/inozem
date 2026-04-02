'use client'

import CookieBanner from "@/components/ui/CookieBanner";

import Footer from "@/components/Layouts/Footer";
import Header from "@/components/Layouts/Header";
import ProgramsButtons from "@/components/ui/Buttons/ProgramsButtons";
import { usePathname } from "next/navigation";


export default function MainLayout({ children } : Readonly<{ children: React.ReactNode }>) {
   const pathname = usePathname()
  return (
    <>
      <Header />
      {pathname === "/programs" && <ProgramsButtons />}
      <main className="w-full max-w-[1200px] min-h-screen mx-auto relative">
 
        {children}
      </main>
      <CookieBanner />
      <Footer />
    </>
  )
}

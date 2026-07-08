import CookieBanner from "@/components/ui/CookieBanner";
import Footer from "@/components/Layouts/Footer";
import Header from "@/components/Layouts/Header";
import LoadingLink from "@/components/Load/LoadingLink";
import { MoveLeft } from "lucide-react";


export default function MainLayout({ children } : Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header />
      <main className="w-full max-w-[1200px] min-h-screen mx-auto relative">
 
        {children}
         <LoadingLink href="/" className="
    inline-flex
    fixed
    left-2
    bottom-0
    items-center
    gap-2
    mb-4
    rounded-xl
    border
    border-zinc-200
    bg-white
    px-4
    py-2.5
    text-zinc-700
    shadow-sm
    transition-all
    duration-200
    hover:-translate-x-1
    hover:border-blue
    hover:text-blue
    hover:shadow-md
  "><MoveLeft size={20} /></LoadingLink>
      </main>
      <CookieBanner />
      <Footer />
    </>
  )
}

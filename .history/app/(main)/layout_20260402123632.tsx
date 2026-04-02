import CookieBanner from "@/components/ui/CookieBanner";
import Footer from "@/components/Layouts/Footer";
import Header from "@/components/Layouts/Header";
import ProgramsButtons from "@/components/ui/Buttons/ProgramsButtons";


export default function MainLayout({ children } : Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header />
      <ProgramsButtons />
      <main className="w-full max-w-[1200px] min-h-screen mx-auto relative">
 
        {children}
      </main>
      <CookieBanner />
      <Footer />
    </>
  )
}

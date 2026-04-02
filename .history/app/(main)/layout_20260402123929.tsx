import CookieBanner from "@/components/ui/CookieBanner";
import Footer from "@/components/Layouts/Footer";
import Header from "@/components/Layouts/Header";


export default function MainLayout({ children } : Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header />
      <main className="w-full max-w-[1200px] min-h-screen mx-auto ">
 
        {children}
      </main>
      <CookieBanner />
      <Footer />
    </>
  )
}

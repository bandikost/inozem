import CookieBanner from "@/components/ui/CookieBanner";
import Footer from "@/components/Layouts/Footer";
import NavigationDone from "@/components/ui/LazyLoad/NavigationDone";


export default function MainLayout({ children } : Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <main className="w-full max-w-[1200px] flex flex-col items-center justify-center h-screen mx-auto px-4 ">
        <NavigationDone />
        {children}
      </main>
      <CookieBanner />
      <Footer />
    </>
  )
}

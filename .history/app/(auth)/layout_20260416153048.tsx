import CookieBanner from "@/components/ui/CookieBanner";
import Footer from "@/components/Layouts/Footer";
import NavigationDone from "@/components/ui/LazyLoad/NavigationProgress";


export default function MainLayout({ children } : Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <main className="w-full max-w-[1200px] min-h-screen flex flex-col mx-auto">
        <NavigationDone />
        {children}
      </main>
      <CookieBanner />
      <Footer />
    </>
  )
}

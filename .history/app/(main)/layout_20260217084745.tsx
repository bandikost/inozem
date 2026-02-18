import Footer from "@/components/Layouts/Footer";
import Header from "@/components/Layouts/Header";


export default function MainLayout({ children }) {
  return (
    <>
      <Header />
      <main className="w-[90%] max-w-[1200px] min-h-screen mx-auto px-4 mt-20">
        {children}
      </main>
      <Footer />
    </>
  )
}

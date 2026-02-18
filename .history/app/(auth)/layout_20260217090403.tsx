import Footer from "@/components/Layouts/Footer";


export default function MainLayout({ children } : Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <main className="w-[90%] max-w-[1200px] h-1/2 mx-auto px-4 ">
        {children}
      </main>
      <Footer />
    </>
  )
}

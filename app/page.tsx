import FirstBlock from "@/components/MainPage/FirstBlock";
import SecondBlock from "@/components/MainPage/SecondBlock";



export default function Home() {
  return (
    <div className="flex  items-center justify-center mb-10">
      <main className="flex w-full grid grid-cols-1 gap-8 mt-10">
        <FirstBlock />
        <SecondBlock />
      </main>
    </div>
  );
}

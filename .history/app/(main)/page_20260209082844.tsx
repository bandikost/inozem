import FirstBlock from "@/components/MainPage/FirstBlock";
import SecondBlock from "@/components/MainPage/SecondBlock";
import Slider from "@/components/MainPage/SliderMain";
import ThirdBlock from "@/components/MainPage/ThridBlock";

const slides = [
  '/layouts/17years.jpg',
  '/layouts/od.jpg'
];

export default function Home() {
  return (
    <div className="flex  items-center justify-center mb-10">
      <main className="flex w-full grid grid-cols-1 gap-8 mt-10">
        <Slider slides={slides} />
        <FirstBlock />
        <SecondBlock />
        <ThirdBlock />
      </main>
    </div>
  );
}

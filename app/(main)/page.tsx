export const revalidate = 3600

import FirstBlock from "@/components/MainPage/FirstBlock";
import Programms from "@/components/MainPage/Programms";
import SecondBlock from "@/components/MainPage/SecondBlock";
import ThirdBlock from "@/components/MainPage/ThridBlock";


export default function Home() {

  return (
      <div className="flex flex-col w-full mt-28 mb-10 items-center justify-center ">
        <FirstBlock />
       
        <Programms />
         <SecondBlock />
        <ThirdBlock />
      </div>
  );
}

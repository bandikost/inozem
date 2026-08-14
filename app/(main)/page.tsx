export const revalidate = 3600

import Activity from "@/components/MainPage/Activity";
import Advantages from "@/components/MainPage/Advantages";
import FirstBlock from "@/components/MainPage/FirstBlock";
import NotifyPage from "@/components/MainPage/Notify";
import Programms from "@/components/MainPage/Programms";
import SecondBlock from "@/components/MainPage/SecondBlock";
import ThirdBlock from "@/components/MainPage/ThridBlock";


export default function Home() {

  return (
      <div className="flex flex-col w-full mt-28 mb-10 items-center justify-center ">
          <FirstBlock />
          <Activity />
          <NotifyPage />
          <Programms />
          <SecondBlock />
          <ThirdBlock />
          <Advantages />
          
      </div>
  );
}

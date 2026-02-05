import FirstBlock from "@/components/MainPage/FirstBlock";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center ">
      <main className="flex min-h-screen w-full flex-col items-center justify-between mt-10">
        <FirstBlock />
      </main>
    </div>
  );
}

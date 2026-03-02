import { Image } from "lucide-react";

export default async function FirstBlock() {

    return (
        <section className="border-2 border-dotted border-zinc-300 pb-8 mt-8 rounded shadow-2xl bg-white">
           <div className="grid grid-cols-2 gap-8 px-4">
                <div className="border-2 border-dotted border-zinc-300 pb-8 mt-8 rounded shadow-2xl bg-white"></div>
                <div className="border-2 border-dotted border-zinc-300 pb-8 mt-8 rounded shadow-2xl bg-white flex flex-col p-4">
                    <div className="rounded-xl shadow-xl border border-gray-100">
                        <div className="flex p-4">
                            <Image />
                            <div className="flex flex-col">
                                <h1 >Образовательные мероприятия</h1>
                                <p>Семинары, мастер-классы и конференции</p>
                            </div>
                        </div>
                        
                    </div>
                    <div>1</div>
                    <div className="flex justify-between">
                        <div>1</div>
                        <div>1</div>
                    </div>
                </div>
           </div>
        </section>
    )
}
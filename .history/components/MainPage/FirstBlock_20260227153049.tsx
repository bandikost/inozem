
export default async function FirstBlock() {

    return (
        <section className="border-2 border-dotted border-zinc-300 pb-8 mt-8 rounded shadow-2xl bg-white">
           <div className="grid grid-cols-2 gap-8 px-4">
                <div className="border-2 border-dotted border-zinc-300 pb-8 mt-8 rounded shadow-2xl bg-white"></div>
                <div className="border-2 border-dotted border-zinc-300 pb-8 mt-8 rounded shadow-2xl bg-white flex flex-col">
                    <div>1</div>
                    <div>1</div>
                    <div className="flex jusify-between">
                        <div>1</div>
                        <div>1</div>
                    </div>
                </div>
           </div>
        </section>
    )
}
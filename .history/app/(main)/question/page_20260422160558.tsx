


export default function Page() {

return (
    <section className='flex flex-col justify-center pb-20 px-4'>
      <h1 className='mt-27 text-prpl text-center'>Задать вопрос</h1>
        <div className="grid grid-cols-2 gap-4">
            <div className="mt-10 border border-gray-300 rounded-md shadow-xl">
                <h2 className="text-blue p-4">Часто задаваемые вопросы</h2>
            </div>
            <div className="mt-10 border border-gray-300 rounded-md shadow-xl">
                <h2 className="text-blue p-4">Часто задаваемые вопросы - <span className="!text-xl">Техническая часть</span></h2>
            </div>
        </div>
      </section>
    )
}
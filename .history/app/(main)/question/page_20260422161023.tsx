


export default function Page() {

return (
    <section className='flex flex-col justify-center pb-20 px-4'>
      <h1 className='mt-27 text-prpl text-center'>Задать вопрос</h1>
        <div className="grid grid-cols-1 tablet:grid-cols-2 gap-4">
            <div className="mt-10 border border-gray-300 rounded-md shadow-xl p-4">
                <h2 className="text-blue">Часто задаваемые вопросы <br /><span className="!text-xl !font-normal text-default">- Теоретическая часть</span></h2>
                <ul className="mt-4">
                    <li>1</li>
                </ul>
            </div>
            <div className="mt-10 border border-gray-300 rounded-md shadow-xl p-4">
                <h2 className="text-blue">Часто задаваемые вопросы <br /><span className="!text-xl !font-normal text-default">- Техническая часть</span></h2>
                <ul className="mt-4">
                    <li>1</li>
                </ul>
            </div>
        </div>
      </section>
    )
}
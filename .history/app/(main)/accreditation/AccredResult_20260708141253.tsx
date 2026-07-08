<div className="w-full max-w-5xl mb-8 space-y-6">


    {/* Год */}

    <div>

        <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Выберите год
        </h3>

        <div className="flex flex-wrap gap-3">

            {years.map((item)=>(

                <button
                    key={item}
                    onClick={()=>{
                        setYear(String(item))
                        setMonth("")
                        setEducation("")
                        setSpecialization("")
                    }}
                    className={`
                    px-5
                    py-3
                    rounded-xl
                    border
                    transition
                    cursor-pointer

                    ${
                        year === String(item)
                        ?
                        "bg-green text-white border-green shadow-md"
                        :
                        "bg-white border-gray-200 hover:border-green"
                    }
                    `}
                >
                    {item}
                </button>

            ))}

        </div>

    </div>




    {/* Месяц */}

    {year && (

        <div>

            <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Выберите месяц
            </h3>


            <div className="flex flex-wrap gap-3">

                {months.map(item=>(

                    <button
                        key={item}
                        onClick={()=>{
                            setMonth(item)
                            setEducation("")
                            setSpecialization("")
                        }}
                        className={`
                        px-5
                        py-3
                        rounded-xl
                        border
                        transition
                        cursor-pointer

                        ${
                            month === item
                            ?
                            "bg-green text-white border-green"
                            :
                            "bg-white border-gray-200 hover:border-green"
                        }
                        `}
                    >

                        {item}

                    </button>

                ))}

            </div>

        </div>

    )}






    {/* Образование */}

    {month && (

        <div>

            <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Тип образования
            </h3>


            <div className="flex flex-wrap gap-3">

                {educations.map(item=>(

                    <button
                        key={item}
                        onClick={()=>{
                            setEducation(item)
                            setSpecialization("")
                        }}
                        className={`
                        px-5
                        py-3
                        rounded-xl
                        border
                        transition
                        cursor-pointer

                        ${
                            education === item
                            ?
                            "bg-green text-white border-green"
                            :
                            "bg-white border-gray-200 hover:border-green"
                        }
                        `}
                    >

                        {item}

                    </button>

                ))}

            </div>

        </div>

    )}






    {/* Специализация */}

    {education && (

        <div>

            <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Специализация
            </h3>


            <div className="grid sm:grid-cols-2 gap-3">

                {specializations.map(item=>(

                    <button
                        key={item}
                        onClick={()=>{
                            setSpecialization(item)
                        }}
                        className={`
                        text-left
                        px-5
                        py-4
                        rounded-2xl
                        border
                        transition
                        cursor-pointer

                        ${
                            specialization === item
                            ?
                            "bg-green text-white border-green shadow"
                            :
                            "bg-white border-gray-200 hover:border-green hover:shadow-sm"
                        }
                        `}
                    >

                        {item}

                    </button>

                ))}

            </div>

        </div>

    )}


</div>
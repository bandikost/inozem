import { features } from "@/data/partners";
import { Building2 } from "lucide-react";



export default function Advantages() {

    return (
        <div className="grid lg:grid-cols-1 gap-8 mt-24 px-4">

       
            <div className="flex items-center gap-3 mb-8">
              <Building2 className="text-prpl" />
              <h2 className="text-2xl font-bold text-prpl">
                Наши преимущества
              </h2>
            </div>

            <a className="bg-yellow-100 border border-gray-200 shadow-md rounded-2xl p-6 text-center hover:scale-110 transition duration-300 cursor-pointer">
              <span className="text-default text-xl">Для проверки сведений об образовательной организации - перейдите в раздел</span>
            </a>

           <div className="grid gap-4">
  {features.map((item, index) => (
    <div
      key={index}
      className="
        flex
        items-center
        gap-4
        p-4
        rounded-2xl
        bg-slate-50
        border border-slate-200
        shadow
        !text-lg
      "
    >
      <div
        className="
          flex-shrink-0
          w-10 h-10
          rounded-full
          bg-prpl
          text-white
          flex items-center justify-center
          font-semibold
        "
      >
        {index + 1}
      </div>

      <p className="text-slate-600 leading-relaxed !text-lg">
        {item}
      </p>
    </div>
  ))}
</div>
          

          
        </div>
    )
}
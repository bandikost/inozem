import { Accred } from "@/app/interface/accred"

interface Props {
  accred: Accred[]
}



export default function AccredResult({accred}: Props) {


  return (
    <div className="max-w-4xl mx-auto my-10">
       <div className="relative inline-block">
  <select
    className="
      appearance-none
      bg-white
      border border-gray-300
      rounded-lg
      px-4 py-2 pr-10
      text-gray-700
      shadow-sm
      hover:border-green-500
      focus:outline-none
      focus:ring-2
      focus:ring-green-500
      focus:border-green-500
      transition-all
      cursor-pointer
    "
  >
    <option>Выберите год</option>

    {accred.map((a) => (
      <option key={a.id} value={a.year}>
        {a.year}
      </option>
    ))}
  </select>

  <svg
    className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M6 9L12 15L18 9"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
</div>

    </div>
  )
}

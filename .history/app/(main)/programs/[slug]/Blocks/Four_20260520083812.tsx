
interface Props {
    category: string
    education: string 
    specialization: string
    headline?: string[]
    sources?: {
    headlineIndex: number
  }[]
}

export default function Four({
  category,
  education,
  specialization,
  headline,
  sources = []
}: Props) {

  return (
    <section className="relative">

      <div className="border border-gray-300 rounded-md shadow-2xl p-6">
        
      </div>

    </section>
  )
}
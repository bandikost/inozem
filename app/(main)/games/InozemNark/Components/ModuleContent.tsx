import Module1 from "./Modules/Module1"
import Module2 from "./Modules/Module2"


type Props = {
  moduleId: number
}

export default function ModuleContent({ moduleId }: Props) {
  switch (moduleId) {
    case 1:
      return <Module1 />
    
    case 2:
    return <Module2  />

    default:
      return (
        <div className="rounded-xl border border-gray-200 p-6 text-center">
          <p className="text-gray-500">
            Учебный материал готовится к публикации.
          </p>
        </div>
      )
  }
}
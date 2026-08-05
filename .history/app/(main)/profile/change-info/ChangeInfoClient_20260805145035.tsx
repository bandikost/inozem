import { TeacherDetailsRow } from "@/app/interface/teacher"
import { UserRow } from "@/app/interface/user"


interface Props {
    user: UserRow
    teacherinfo: TeacherDetailsRow
}

export default function ChangeInfoClient({user} : Props) {


    return (
        <div className="container max-w-6xl px-2">
             {user.name}
        </div>    
    )

}
import { TeacherDetailsRow } from "@/app/interface/teacher"
import { UserRow } from "@/app/interface/user"


interface Props {
    user: UserRow
    teacherinfo: TeacherDetailsRow | null
}

export default function ChangeInfoClient({user, teacherinfo} : Props) {


    return (
        <div className="container max-w-6xl px-2">
             {user.name} - {teacherinfo.user_id}
        </div>    
    )

}
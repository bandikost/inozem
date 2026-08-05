"use client"


import { TeacherDetailsRow } from "@/app/interface/teacher"
import { UserRow } from "@/app/interface/user"


interface Props {
    user: UserRow
    teacherinfo: TeacherDetailsRow | null
}

export default function ChangeInfoClient({user, teacherinfo} : Props) {


    return (
        <div className="container max-w-6xl px-2">
      <p>
        {user.name} —{" "}
        {teacherinfo
          ? teacherinfo.user_id
          : "Информация преподавателя пока не заполнена"}
      </p>
    </div>
    )

}
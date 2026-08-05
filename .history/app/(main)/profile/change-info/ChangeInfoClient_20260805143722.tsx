import { UserRow } from "@/app/interface/user"


interface Props {
    user: UserRow
}

export default function ChangeInfoClient({user} : Props) {


    return (
        <div className="container max-w-6xl px-2">
             {user.first_name}
        </div>    
    )

}
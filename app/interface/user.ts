import { RowDataPacket } from "mysql2/promise"


export interface UserRow extends RowDataPacket{
  id: number
  name: string
  last_name: string
  patronymic: string 
  email: string
  phone: string
  specialization: string
  education_level: string
  password: string
  isTeacher?: number
  isEmployer?: boolean
  isAdmin: boolean
  superAdmin? : boolean
  photo_url: string 
  created_at: Date
  program_name: string 
}

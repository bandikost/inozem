import { RowDataPacket } from "mysql2"

export interface UserRow extends RowDataPacket {
  id: number
  name: string
  last_name: string
  patronymic: string 
  email: string
  phone: string
  education_level: string
  password: string
  isTeacher: number
  photo_url: string 
  created_at: Date
  program_name: string 
}

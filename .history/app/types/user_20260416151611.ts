

export interface UserRow {
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
  isAdmin: boolean
  photo_url: string 
  created_at: Date
  program_name: string 
}

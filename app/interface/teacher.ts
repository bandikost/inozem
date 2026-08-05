export interface TeacherDetailsRow {
  id: number
  user_id: number

  position: string | null
  subjects: string | null
  education: string | null

  academic_degree: string | null
  academic_title: string | null

  advanced_training: string | null
  professional_retraining: string | null

  professional_experience: number | null

  educational_programs: string | null

  created_at: string
  updated_at: string
}
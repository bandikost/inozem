export type Activity = {
  id: number
  name: string
  price: number
  slug: string
  title: string
  description: string
  teacher: string
  purpose: string
  audience: string
  conditions: string
  dates: string
  year: number
  paylink: string
  created_at: string
  title_bg: string
  teacher_img: string
  attendance_control: string | null;
  location: string | null;
  planned_results: string | null;
}
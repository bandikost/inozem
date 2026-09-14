
export interface DepartmentTeacher {
  id: number
  name: string
  patronymic: string
  last_name: string
  photo_url: string
  Teacher_text?: string
}


export type Departaments = {
  id: number;
  name: string | null;
  slug: string | null;
  goals: string | null;
  directions: string | null;
  scientific: string | null;
  series: string | null;
  bases: string | null;
  teachers?: DepartmentTeacher[]
}
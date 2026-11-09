export interface AcademyStructureRow {
  id: number;
  user_id: number | null;
  employer_id: number;
  employer_name: string;
  position: string;
  sort_order: number;
  contact_phone: string | null;
  contact_email: string | null;

  name: string | null;
  last_name: string | null;
  patronymic: string | null;
  photo_url: string | null;
  specialization: string | null;
  Teacher_text: string | null;
}
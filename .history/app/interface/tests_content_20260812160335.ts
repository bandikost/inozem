import { RowDataPacket } from "mysql2";

export interface TestCreatedWithContent extends RowDataPacket {
  id: number;
  slug: string;
  title: string;
  created_at: Date | string;

  content_id: number | null;
  question_number: number | null;
  question: string | null;
  answers: string | null;
}
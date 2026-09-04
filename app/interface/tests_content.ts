import { RowDataPacket } from "mysql2";

export interface TestCreatedWithContent extends RowDataPacket {
  id: number;
  slug: string | null;
  title: string;
  created_at: Date | string;

  content_id: number;
  question_number: number;
  question: string;
  answers: string;
}
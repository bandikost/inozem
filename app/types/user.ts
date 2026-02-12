import { RowDataPacket } from "mysql2";

export interface UserRow extends RowDataPacket {
  id: number;
  name: string;
  last_name: string;
  patronymic: string | null;
  email: string;
  phone: string;
  password: string;
  isTeacher: number;
  photo_url: string | null;
  created_at: Date;
}
